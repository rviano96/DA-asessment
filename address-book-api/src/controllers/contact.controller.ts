import { NextFunction, Request, Response } from "express";
import { IContact } from "../interfaces/contact.interface";
import { create, findAll, findOneById, remove, update } from '../services/contact.service'

const parseIntOrNullUndefined = (value: any): number | undefined => {
    return parseInt(value) || undefined
}

export const getContacts = async (req: Request, res: Response, next: NextFunction) => {
    const { offset, limit, searchText } = req.query
    try {
        const { contacts, count } = await findAll(parseIntOrNullUndefined(offset), parseIntOrNullUndefined(limit), searchText as string)
        res.status(200).json({ contacts, count })
    } catch (error: any) {
        console.log(error)
        return next(error);
    }
}

export const getContact = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
        const contact = await findOneById(parseInt(id))
        res.status(200).json(contact)
    } catch (error: any) {
        console.log(error)
        return next(error);
    }
}

export const createContact = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req
    try {
        const contact = await create(body as IContact)
        res.status(201).json(contact)
    } catch (error: any) {
        console.log(error)
        return next(error);
    }
}

export const updateContact = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const { body } = req
    try {
        const contact = await update(body as IContact, parseInt(id))
        res.status(200).json(contact)
    } catch (error: any) {
        console.log(error)
        return next(error);
    }
}

export const deleteContact = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
        await remove(parseInt(id))
        res.status(200).json()
    } catch (error: any) {
        console.log(error)
        return next(error);
    }
}
