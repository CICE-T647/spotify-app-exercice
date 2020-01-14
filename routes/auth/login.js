
const Express = require("express");
const bcrypt = require("bcryptjs")
const router = Express.Router();
const User = require("../../models/User");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const isLoggedIn = require("../../middlewares/isLoggedIn")


router.get("/", isLoggedIn, (req,res)=>{
    const user = req.user
    res.render("login", {user}); 
})
router.post("/", (req, res) => {
    // procedemos a autenticar la estrategia local 
    passport.authenticate("local", { session: false }, (error, user, info) => {
      console.log("error:"+ error + "info" + info)
      if (error) return res.render("login", { error: error.message });
      if (info) return res.render("login", { error: info.message });

    const payload = {
        sub: user._id,
        exp: Date.now() + parseInt(process.env.JWT_EXPIRES),
        username: user.username
      };
      const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET );
      return res.status(200).json({ data: { token } });
    })(req, res);
  });
  


// router.post("/", async (req, res) => {

//     const { email, password } = req.body

//     try{
//     // Validaciones de errores
//     const user = await User.findOne({ email })
//     if (!user) return res.render("login", { error: "El usuario no existe" })
//     const  passwordDB = user.password

//     if ( ! bcrypt.compareSync( password, passwordDB ) ) return res.render("login", {error: "La contraseña no es correcta"})
//     if( !email || !password) res.render("login", { error: "Toos los campos son requeridos" })
//     //Asignamos el user
//     req.session.currentUser = user
//     //Redireccionamos a la raíz. 
//     res.redirect("/")

//     } catch(error) {
//         console.log(error)
//          res.status(500).json({ message: "Hubo un problema" })
//     }





// })


module.exports = router