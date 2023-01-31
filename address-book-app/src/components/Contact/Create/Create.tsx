import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CONTACT_BASE_PATH } from "../../../Constants"
import { IContact } from "../../../interfaces/contact.interface"
import { Contact } from "../../../models/contact.model"
import { createContact } from "../../../services/contact.service"
import ContactForm from "../Form/From"

const CreateContact: React.FC = () => {
    const navigate = useNavigate()

    const createNewContact = async (values: IContact) => {
        const contact = new Contact(values)
        try {
            await createContact(contact)
            navigate(CONTACT_BASE_PATH)
        } catch (error: any) {
            throw error
        }

    }

    return (
        <ContactForm onSubmit={(values: IContact) => createNewContact(values)} />
    )
}

export default CreateContact