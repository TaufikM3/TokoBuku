import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import authRouter from './router/authRouter.js'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { errorHandler, notFound } from './middleware/errorHandle.js'


dotenv.config()

const app = express()
const port = 3500

//app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
if (process.env.NODE_ENV == 'develovment'){
  app.use(morgan('dev'))
}
app.use(morgan('dev'))

app.get('/api/v1/test', (req, res) => {
  res.status(200).json({
    message: "mesage dari entpoint expres"
  })
})

//parent router
app.use('/api/v1/auth', authRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`aplikasi ini berjalan di port ${port}`)
})

//KONEKSI DATA BASE
mongoose.connect(process.env.DATABASE,{
}).then(()=>{
  console.log("database coneck")
})