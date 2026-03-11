import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/connectDB.js'

dotenv.config()

const app = express()

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"] 
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan('dev')) 
app.use(helmet({
    crossOriginResourcePolicy: false
}))

app.get('/', (request, response) => {
    response.json({
        message: "Server is running vivek " + (process.env.PORT || 8000)
    })
})

const PORT = process.env.PORT || 8000

// Yahan se humne // hata diya hai taaki server chalu ho jaye


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}).catch((error) => {
    console.log('Failed to connect to database', error)
})