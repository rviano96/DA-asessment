import { IContact } from "../interfaces/contact.interface";

export class Contact implements IContact {
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

    constructor(
        { id, name, surname, email, phone, createdAt, deletedAt, updatedAt, about, photoUrl }: IContact
    ) {
        this.id = id
        this.name = name.trim().toLowerCase()
        this.surname = surname.trim().toLowerCase()
        this.email = email.trim().toLowerCase()
        this.phone = phone
        this.deletedAt = deletedAt
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.about = about ?? undefined
        this.photoUrl = photoUrl?.trim().toLowerCase()
    }

    public get fullName(): string {
        // const formatedName = `${this.name.charAt(0).toUpperCase()}${this.name.slice(1)}`
        // const formatedSurname = `${this.surname.charAt(0).toUpperCase()}${this.surname.slice(1)}`
        return `${this.name.toLowerCase()} ${this.surname.toLowerCase()}`

    }

}