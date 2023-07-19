// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { userRouter } = require('./routes/user.route');
const { moviesRouter } = require('./routes/movie.route');
const { showsRouter } = require('./routes/show.route');

const { dbConnection } = require('./config/db');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get("/",(req,res)=>{
    res.send("Cine Matrix Welcome")

})
app.use("/users",userRouter)
app.use('/movies', moviesRouter);
app.use('/shows', showsRouter);

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