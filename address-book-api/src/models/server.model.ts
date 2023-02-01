import express, { Application } from "express";
import contactRoutes from "../routes/contacts.route";
import cors from 'cors'

import db from '../config/database/connection'
import { customErrorHandler } from "../utils/errorHandler";

class Server {

    private app: Application
    private port: string
    private apiPaths = {
        contacts: '/api/contacts'
    }

    constructor() {
        this.app = express()
        this.port = process.env.PORT || '4000'
        this.dbConnection()
        this.middlewares()
        this.routes()
        //Error handler
        this.app.use(customErrorHandler)

    }

    async dbConnection() {
        try {
            await db.authenticate()
            console.log("Database connected")
        } catch (error: any) {
            throw new Error(error)
        }
    }

    middlewares() {
        //CORS
        this.app.use(cors())
        //Serialize body
        this.app.use(express.json())
    }

    routes() {
        this.app.use(this.apiPaths.contacts, contactRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port: ${this.port}`)
        })
    }
    
}

export default Server