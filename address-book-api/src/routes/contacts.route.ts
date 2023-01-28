import { Router } from 'express'
import { createContact, deleteContact, getContact, getContacts, updateContact } from '../controllers/contacts.controller'

const router = Router()

router.get('/', getContacts)
router.get('/:id', getContact)
router.post('/', createContact)
router.put('/:id', updateContact)
router.delete('/:id', deleteContact)

export default router