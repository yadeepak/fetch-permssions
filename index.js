require('dotenv').config()

const express = require('express')
const basicAuth = require('express-basic-auth')
const mongoose = require('mongoose')
const UsersDataModel = require('./models/userdata')
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true,useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))
const app = express()
app.use(express.json())

//check basic auth , auth fail will return empty body with 401 status
app.use(basicAuth({
  users: { 'admin': 'admin' }
}))

//store data api
app.post('/store-userinfo', async (req, res) => {
  const {connections} = req.body;
  const recievedData = connections.filter(connType=>Object.values(connType)[0]);
    const data = new UsersDataModel({
        userId: req.body.userId,
        connections: recievedData
      })
      try {
        const responseData = await data.save()
        res.status(201).json(responseData)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
});

app.listen(process.env.PORT, () => console.log('Server Started'))