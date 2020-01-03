
const Express = require("express");
const bcrypt = require("bcryptjs")
const token = require("../../spotify-token/getToken");
const router = Express.Router();
const User = require("../../models/User");

router.get("/", (req,res)=>{
    res.render("login"); 
})

router.post("/", async (req, res) => {

    const { email, password } = req.body

    try{
    const user = await User.findOne({ email })

    if (!user) return res.render("login", { error: "El usuario no existe" })
    
    const  passwordDB = user.password

    if ( ! bcrypt.compareSync( password, passwordDB ) ) return res.render("login", {error: "La contraseña no es correcta"})

    req.session.currentUser = user

    res.redirect("/")

    } catch(error) {
        console.log(error)
         res.status(500).json({ message: "Hubo un problema" })
    }





})


module.exports = router