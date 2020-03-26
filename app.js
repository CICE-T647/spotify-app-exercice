require("dotenv").config();

const Express = require("express");
const app = Express();
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const passport = require("passport");
const fileUpload = require("express-fileupload");

//auth strategies
const {
  localStrategy,
  tokenStrategy,
  gitLabStrategy
} = require("./strategies");

const indexRouter = require("./routes/index");

const SERVER_PORT = process.env.SERVER_PORT || 5000;
const DB_PORT = process.env.DB_PORT || 27017;

const hbs = require("hbs");

app.use(Express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.use(localStrategy);
passport.use(gitLabStrategy);
passport.use(tokenStrategy);

app.use(fileUpload());

//routes
app.use("/", indexRouter);

mongoose
  .connect(`mongodb://localhost:${DB_PORT}/spotify_appdb`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`Connected to mongo on port ${DB_PORT}`))
  .catch(err => {
    throw err;
  });

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT} `);
});
