require("dotenv").config();

const Express = require("express");
const app = Express();
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const bodyParser = require("body-parser");
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const DB_PORT = process.env.DB_PORT;

const hbs = require("hbs")

app.use(Express.static(__dirname + "/public"))
app.set("views", __dirname + "/views")
app.set("view engine", "hbs")
hbs.registerPartials(__dirname + '/views/partials');

// Use the session middleware
 app.use(session({ 
  secret: 'basic-auth', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // para protocolo https o no
  store: new MongoStore({
      mongooseConnection: mongoose.connection
  })
})) 


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* app.use("/", (req, res)=> {
  res.send("hola que tal")
}); */
app.use("/", require("./routes/index.js"))
app.use("/auth", require("./routes/auth"));
app.use("/home", require("./routes/auth"));
app.use("/albums", require("./routes/albums"));


mongoose
    .connect(`mongodb://localhost:${DB_PORT}/spotyapp`, {
         useNewUrlParser: true,
         useUnifiedTopology: true
    })
    .then(() => console.log(`conectado a mongo en el puerto ${DB_PORT}`))
    .catch(err => {
        throw err;
    })


app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT} `);
});
