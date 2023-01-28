import dotenv from 'dotenv'
import Server from './models/server.model'

//config env variables
dotenv.config()

//instatiates and "start" server 
const server = new Server()
server.listen()
