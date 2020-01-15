const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const User = require("../../models/User");

// para renderizar la vista:
router.get("/", (req, res) => {
    res.render("login");
});

router.post("/", async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
    
        if(!user) return res.status(404).json({message: "el usuario no existe"});

        const passwordDB = user.password;

        // comparamos la contraseña del front con la que tengo en la base de datos. Devuelve un booleano
        if (!bcrypt.compareSync(password, passwordDB)) {
            return res.status(401).json({message: "la contraseña no es correcta"})
        }

        req.session.currentUser = user; // creamos el currentUser, no existe esta propiedad, le damos el nombre que queramos

        res.redirect("/auth/home")
       // res.status(200).json({ message: "Usuario logueado", user })


    } catch(error) {

        console.log(err);
        return res.status(500).json({message: "hubo un problema"})
    }
    

})


module.exports = router;