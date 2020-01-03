
const Express = require("express");
const bcrypt = require("bcryptjs")
const router = Express.Router();
const User = require("../../models/User");

router.get("/", (req,res)=>{
    const user = req.session.currentUser 
    res.render("signup", {user}); 
})

router.post("/", async (req, res) => {

    const { name, lastname, username, email, password } = req.body

    try{
        //Validación de errores
        const user_email = await User.findOne({ email })
        const user_username = await User.findOne({ username })
        if (user_email) return res.render("signup", { error: "El usuario con este email ya existe, por favor logueate o usa otro" })
        if (user_username) return res.render("signup", { error: "El usuario con este username ya existe por favor usa otro" })
        if(!name || !lastname || !username || !email || !password) return res.render("signup", { error: "Todos los campos son requeridos" })

    } catch(error){
        console.log(error)
        return res.status(500).json({ message: "Hubo un problema" })
    }


    const saltRounds = 10;

    const salt = bcrypt.genSaltSync(saltRounds)

    const hashPass = bcrypt.hashSync( password, salt )

    const user = new User({
        name, 
        lastname, 
        username, 
        email, 
        password : hashPass
    })

    try{
        await user.save();
        req.session.currentUser = user
        res.redirect("/"); 

    } catch(error){
        console.log(error)
        res.render("signup", { error })
    }

})


module.exports = router