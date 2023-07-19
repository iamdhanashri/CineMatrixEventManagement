// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { userRouter } = require('./routes/user.route');
const { dbConnection } = require('./config/db');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get("/",(req,res)=>{
    res.send("Cine Matrix Welcome")

})
app.use("/users",userRouter)


// Start the server

app.listen(8080,async()=>{
    try{
   await dbConnection
   console.log("connected to db")
    }
    catch(e){
        console.log(e.message)
    }
    console.log("listening port 8080")
})