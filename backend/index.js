// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { userRouter } = require('./routes/user.route.js');
const { movieRouter } = require('./routes/movie.route.js');
const { showRouter } = require('./routes/show.route.js');
const { participantRouter } = require('./routes/participant.route.js');


const { dbConnection } = require('./config/db');
const { eventRouter } = require('./routes/event.route.js');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get("/",(req,res)=>{
    res.send("Cine Matrix Welcome")

})
app.use("/users",userRouter)
app.use('/movies', movieRouter);
app.use('/shows', showRouter);
app.use("/parti",participantRouter)
app.use("/events",eventRouter)

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