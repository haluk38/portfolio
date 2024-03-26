const express = require("express")
const mongoose = require("mongoose");
const session = require('express-session')

const mainRouter = require("./routers/mainRouter");
const adminRouter = require("./routers/adminRouter")


const app = express();

app.use(express.json())
app.use(express.static("./assets"));
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret:'votre_secret_key',
    resave: true,
    saveUninitialized: true,
}))
app.use(mainRouter);
app.use(adminRouter);

app.listen(3000, (err)=>{
    console.log(err ? err : "connecter au server");
});

mongoose.connect('mongodb://localhost:27017/portfolio')