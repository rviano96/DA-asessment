import React, { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { CONTACT_BASE_PATH } from "../../../Constants"
import { IContact } from "../../../interfaces/contact.interface"
import { Contact } from "../../../models/contact.model"
import { getContact, updateContact, removeContact } from "../../../services/contact.service"
import ContactForm from "../Form/From"
import { Dialog, DialogActions, } from "@mui/material"
import { CustomDialogTitle, DialogContent, CustomDialogText } from "./Styles"
import { Button } from "../CommonStyles"

const EditContact: React.FC = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [contact, setContact] = React.useState<IContact>()
    const [openDialog, setOpenDialog] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    useEffect(() => {
        if (id) {
            retrieveContact(parseInt(id))
        }
    }, [id])

    const retrieveContact = async (id: number) => {
        try {
            setIsLoading(true)
            const response = await getContact(id)
            setContact(response.data.contact)
        } catch (error: any) {
            console.log(error)
            navigate(CONTACT_BASE_PATH)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const update = async (values: IContact) => {
        if (id) {
            try {
                setIsLoading(true)
                const contact = new Contact(values)
                delete contact.deletedAt
                delete contact.id
                delete contact.createdAt
                delete contact.updatedAt
                await updateContact(contact, parseInt(id))
                navigate(CONTACT_BASE_PATH)
            } catch (error: any) {
                console.log(error)
                throw error
            } finally {
                setIsLoading(false)
            }
        }

    }

    const deleteContact = async () => {
        if (id) {
            try {
                setIsLoading(true)
                await removeContact(parseInt(id))
                navigate(CONTACT_BASE_PATH)
            } catch (error: any) {
                console.log(error)
                throw error
            } finally {
                closeDialog()
                setIsLoading(true)
            }
        }

    }

    const closeDialog = () => {
        setOpenDialog(false)
    }

    return (
        <>
            <ContactForm
                contactData={contact}
                edit={true}
                onSubmit={(values: IContact) => update(values)}
                onDelete={() => setOpenDialog(true)}
                isLoading={isLoading}
            />
            <Dialog
                open={openDialog}
                onClose={closeDialog}

            >
                <DialogContent>
                    <CustomDialogTitle >
                        {"Delete contact"}
                    </CustomDialogTitle>
                    <CustomDialogText id="alert-dialog-description">
                        Are you sure you want to delete this contact?
                    </CustomDialogText>
                    <DialogActions>
                        <Button onClick={closeDialog}>Cancel</Button>
                        <Button onClick={deleteContact}>
                            Yes, delete contact
                        </Button>
                    </DialogActions>
                </DialogContent>

            </Dialog>
        </>
    )
}

export default EditContact