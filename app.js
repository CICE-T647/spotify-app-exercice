require("dotenv").config();
const Express = require("express");
const app = Express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/User");
const passport = require("passport");
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const DB_PORT = process.env.DB_PORT;

// const session = require("express-session");
// const MongoStore = require("connect-mongo")(session);


const hbs = require("hbs")

// importamos la estrategia local
const LocalStrategy = require("passport-local").Strategy;

// Importamos la estrategia json web token
const JwtStrategy = require("passport-jwt").Strategy;

// Importamos la funcionalidad para descomoprimir el token. 
const ExtractJwt = require("passport-jwt").ExtractJwt;

// Sustituido bcrypt por bcrypjs para su implementación también en windows
const bcrypt = require("bcryptjs");


//Iniciamos Passport
app.use(passport.initialize());
//Iniciamos flash
// app.use(require('flash')());

// 2. DEFINIMOS LA ESTRATEGIA LOCAL. 

  passport.use(
      new LocalStrategy(  {
        usernameField: "email",
        passwordField: "password",
        session: false
      }, async (email, password, next) => {
        console.log(`Estrategia local. Información recibida: email ${email}, password ${password}`)
        try {
          const user = await User.findOne({ email });
          console.log(user)
         if (!user) return next(null, false, { message: "El usuario no existe" });
    
          if (!bcrypt.compareSync(password, user.password))
            return next(null, false, { message: "la contraseña no es correcta" });
          next(null, user);
        } catch (error) {
          console.log(error)
          next(error);
        }
      })
    );

// 4. DEFINIMOS LA CONFIGURACIÓN DE LA ESTRATEGIA JWT
const opts = {
  jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(
  new JwtStrategy(opts, async (tokenPayload, next) => {
    console.log(`Estrategia jwt. Información recibida: token ${tokenPayload}`)
    try {
      const user = await User.findOne({ _id: tokenPayload.sub });
      console.log(user)
      if (!user) next(null, false, { message: "invalid token" });
      next(null, user);
    } catch (error) {
      console.log(error)
      next(error);
    }
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(Express.static(__dirname + "/public"))
app.set("views", __dirname + "/views")
app.set("view engine", "hbs")
hbs.registerPartials(__dirname + '/views/partials');


app.use("/", require("./routes"));
app.use("/releases", require("./routes/releases"));
app.use("/auth", require("./routes/auth"));
app.use("/album", require("./routes/album"));
app.use("/404", require("./routes/404.js"));

mongoose
  .connect(`mongodb://localhost:${DB_PORT}/app`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`Connected to mongo on port ${DB_PORT}`))
  .catch(err => {
    throw err;
  });

app.use((req, res) => res.redirect("404")); 

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT} `);
});
