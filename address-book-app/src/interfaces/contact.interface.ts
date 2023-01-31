export interface IContact {
    id?: string
    name: string
    surname: string
    email: string
    phone: string
    deletedAt?: Date
    createdAt?: Date
    updatedAt?: Date
    about?: string
    photoUrl?: string
}