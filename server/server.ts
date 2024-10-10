import express from 'express'
import userRouter from './routes/user'

import mongoose from 'mongoose'
import todosRouter from './routes/todo'

const PORT = 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/user', userRouter)

app.use('/todos', todosRouter)

// connecting to the database
mongoose.connect(process.env.CONN_STRING!)
    .then(() => {

        // If connection is established succesfully, start the server
        app.listen(PORT, () => {
            console.log(`Server is located on http://localhost:${PORT}`)
        })
    })
    .catch(err => console.error('MongoDB connection error', err))
