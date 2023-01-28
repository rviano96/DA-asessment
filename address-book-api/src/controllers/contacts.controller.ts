import { Request, Response } from "express";

export const getContacts = (req: Request, res: Response) => {
    res.json({ msg: 'getContacts' })
}

export const getContact = (req: Request, res: Response) => {
    const { id } = req.params

    res.json({ msg: `getContact with id ${id}` })
}

export const createContact = (req: Request, res: Response) => {
    const { body } = req
    res.json({ msg: 'createContact', body })
}

export const updateContact = (req: Request, res: Response) => {
    const { id } = req.params
    const { body } = req

    res.json({ msg: `updateContact with id ${id}`, body })
}

export const deleteContact = (req: Request, res: Response) => {
    const { id } = req.params

    res.json({ msg: `deleteContact with id ${id}` })
}
