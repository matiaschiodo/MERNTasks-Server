const express = require('express')
const connectDB = require('./config/db')

const app = express()

connectDB()

app.use(express.json({ extended: true }))

const PORT = process.env.PORT || 4000

app.use('/api/users', require('./routes/users'))

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`)
})