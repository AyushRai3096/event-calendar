const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");

//import routers
const userRouter     = require('./routes/userRoutes');
const eventRouter    = require('./routes/eventRoutes');
const signupRouter   = require('./routes/signupRoutes');
const loginRouter   = require('./routes/loginRoutes');
const logoutRouter   = require('./routes/logoutRoutes')

const app = express();

//use middlewares
app.use(cors());
app.use(bodyParser.json());

//register routes
app.use("/user", userRouter)
app.use("/event", eventRouter)
app.use("/signup", signupRouter)
app.use("/login", loginRouter)
app.use("/logout", logoutRouter)

app.use((req, res, next) => {
    const error = new Error("Requested route not found")
    error.statusCode = 404;
    throw error;
});


//error handling middleware
app.use((error, req, res, next) => {
    if (!error.statusCode) {
        error.statusCode = 500;
    }
    console.log(error.message);
    res.status(error.statusCode).send(error.message);
});

//define port 
var port = process.env.PORT || 5000;

//connect mongodb and start server
mongoose.connect("mongodb+srv://ayush:ayush@eventcalendar.3073r.mongodb.net/eventCalendar?retryWrites=true&w=majority").then(result => {
    console.log("Connected to mongo db")
    app.listen(port)
}).catch(err => {
    console.log(err)
});
