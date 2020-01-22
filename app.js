require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const hbs = require("express-handlebars")
const fileUpload = require("express-fileupload");
const cors = require("cors");

var app = express();
app.use(cors());
require("./passport/config")(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join("public","views"))
app.use(fileUpload())
app.use("/api", indexRouter)

app.get("/login", (req, res)=>{
    res.render("login")
})

app.get("/signup", (req, res)=>{
    res.render("signup")
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json({ message: "Not found" });
});

mongoose
  .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-6pijq.mongodb.net/spotify?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Base de datos conectada"))
  .catch(() => {
    throw error;
  });

module.exports = app;
