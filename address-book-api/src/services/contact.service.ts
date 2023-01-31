import { Op } from "sequelize";
import { IContact } from "../interfaces/contact.interface";
import { Contact } from "../models/contact.model";
import { ALREADY_EXIST_EXCEPTION, CONTACT_NOT_FOUND_EXCEPTION } from "../utils/constants";
import CustomError from "../utils/customError";

export const create = async (newContact: IContact): Promise<{ contact: IContact }> => {
    try {
        const [contactRecord, created] = await Contact.findOrCreate({
            where: { email: newContact.email },
            defaults: { ...newContact }
        });
        if (!created) {
            throw new CustomError('Cannot create contact\n. There is already a contact with that email', ALREADY_EXIST_EXCEPTION)
        }
        return { contact: contactRecord }
    } catch (error: any) {
        throw error
    }
}

export const update = async (contactToUpdate: IContact, id: number): Promise<{ contact: IContact }> => {
    try {
        const existingContact = await Contact.findByPk(id)

        if (!existingContact) {
            throw new CustomError('Cannot update contact\n. There is no contact with that ID', CONTACT_NOT_FOUND_EXCEPTION)
        }

        if (!!contactToUpdate.email && (contactToUpdate.email !== existingContact.email)) {
            const contact = await Contact.findOne({ where: { email: contactToUpdate.email, id: { [Op.ne]: id } } })
            if (contact) {
                throw new CustomError('Cannot update contact\n. There is already a contact with that email', ALREADY_EXIST_EXCEPTION)
            }
        }
        const [_, updatedContact] = await Contact.update({ ...contactToUpdate }, { where: { id: id }, returning: true })
        return { contact: updatedContact[0] }
    } catch (error: any) {
        throw error
    }
}

export const remove = async (id: number): Promise<any> => {
    try {
        const existingContact = await Contact.findByPk(id)

        if (!existingContact) {
            throw new CustomError('Cannot remove contact\n. There is no contact with that ID', CONTACT_NOT_FOUND_EXCEPTION)
        }

        await Contact.update({ deletedAt: new Date() }, { where: { id: id } })

    } catch (error: any) {
        throw error
    }

}

export const findAll = async (offset: number = 0, limit: number = 25, searchText: string = ''): Promise<{ contacts: IContact[], count?: number }> => {
    try {
        const contacts: IContact[] = await Contact.findAll({
            where: {
                deletedAt: null,
                [Op.or]: [
                    { name: { [Op.like]: `%${searchText}%` } },
                    { surname: { [Op.like]: `%${searchText}%` } },
                    { email: { [Op.like]: `%${searchText}%` } },
                    { phone: { [Op.like]: `%${searchText}%` } }
                ]
            },
            offset,
            limit
        })
        if (offset === 0) {
            const count = await Contact.count(
                {
                    where: {
                        deletedAt: null,
                        [Op.or]: [
                            { name: { [Op.like]: `%${searchText}%` } },
                            { surname: { [Op.like]: `%${searchText}%` } },
                            { email: { [Op.like]: `%${searchText}%` } },
                            { phone: { [Op.like]: `%${searchText}%` } }
                        ]
                    },
                }
            )
            return { contacts, count }
        }
        return { contacts }
    } catch (error: any) {
        throw error
    }

}

export const findOneById = async (id: number): Promise<{ contact: IContact }> => {
    try {
        const contact: IContact | null = await Contact.findByPk(id)

        if (!contact) {
            throw new CustomError(' There is no contact with that ID', CONTACT_NOT_FOUND_EXCEPTION)
        }
        return { contact: contact as IContact }
    } catch (error: any) {
        throw error
    }

}

