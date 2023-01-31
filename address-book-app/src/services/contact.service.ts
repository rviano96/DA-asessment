import { get, post, put, requestDelete } from "../http.commons"
import { IContact } from "../interfaces/contact.interface"

export const getAllContacts = (params: { offset: number, limit: number, search?: string }) => {
    const { offset, limit, search } = params
    let url = `contacts?offset=${offset}&limit=${limit}`
    if (!!search) url += `&searchText=${search}`
    return get(url)
}

export const getContact = (id: number) => {
    return get(`contacts/${id}`)
}

export const createContact = (contact: IContact) => {
    return post(`contacts`, { ...contact })
}

export const updateContact = (contact: IContact) => {
    return put(`contacts`, { ...contact })
}
export const removeContact = (id: number) => {
    return requestDelete(`contacts/${id}`)
}