const express = require("express");
const cheerio = require("cheerio")
const mongoose = require("mongoose");
const axios = require("axios");
const logger = require("morgan");

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(process.cwd() + "/public"));

const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

mongoose.connect("mongodb://localhost/NewsArticles", {useNewUrlParser: true})
const db = mongoose.connection;
// {useNewUrlParser: true};

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(){
    console.log("Connected to Mongoose")
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, function(){
    console.log("Listening on PORT" + PORT);
});

