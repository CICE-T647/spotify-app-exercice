
const Express = require("express");
const bcrypt = require("bcryptjs")
const router = Express.Router();
const User = require("../../models/User");

router.get("/", (req,res)=>{
    res.render("signup"); 
})

router.post("/", async (req, res) => {

    const { name, lastname, username, email, password } = req.body

    try{

        const user = await User.findOne({ email })

        if (user) return res.status( 409 ).json({ message: "El usuario ya existe." })

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

        await user.save()
        res.redirect("/auth/login")
        // res.status(200).json({ message: "Usuario creado correctamente", user })

    } catch(error){
        console.log(error)
        res.status(500).json({ message: "Hubo un problema" })
    }

})


module.exports = router