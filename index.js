const express = require('express')
const dbConnection = require('./db')
const userRouter = require('./userRouter')
const app = express()

require('dotenv').config()


app.use(express.json())
app.use('/blog', userRouter)

app.get('/', async (req, res) => {
    res.send('Hello')



})

app.listen(process.env.PORT || 5000, () => {
    console.log(`App is running on port ${process.env.PORT}`)
    dbConnection()
})