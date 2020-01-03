
const Express = require("express");
const bcrypt = require("bcryptjs")
const token = require("../../spotify-token/getToken");
const router = Express.Router();
const User = require("../../models/User");

router.get("/", (req,res)=>{
    const user = req.session.currentUser 
    res.render("login", {user}); 
})

router.post("/", async (req, res) => {

    const { email, password } = req.body

    try{
    // Validaciones de errores
    const user = await User.findOne({ email })
    if (!user) return res.render("login", { error: "El usuario no existe" })
    const  passwordDB = user.password

    if ( ! bcrypt.compareSync( password, passwordDB ) ) return res.render("login", {error: "La contraseña no es correcta"})
    if( !email || !password) res.render("login", { error: "Toos los campos son requeridos" })
    //Asignamos el user
    req.session.currentUser = user
    //Redireccionamos a la raíz. 
    res.redirect("/")

    } catch(error) {
        console.log(error)
         res.status(500).json({ message: "Hubo un problema" })
    }





})


module.exports = router