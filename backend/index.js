const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const webhooks = require('../backend/controllers/Order/webhook')
const connectDB = require('./config/db')
const router = require('./routes')
const app = express()
app.post("/webhook", express.raw({ type:"application/json" }),webhooks)
app.use(express.json())
app.use(cors({
    origin :process.env.FRONTEND_URL ,
    credentials : true
}))

app.use(cookieParser())
app.use("/api", router)
console.log(
  app._router.stack
    .filter(r => r.route)
    .map(r => r.route.path)
);

const PORT = process.env.PORT || 8080
connectDB().then(() =>{
    app.listen(PORT, () =>{
        console.log("server is running")
        console.log("connected to db")
})
})