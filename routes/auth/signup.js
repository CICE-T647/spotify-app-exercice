const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const User = require("../../models/User");

// renderizamos el formulario signup
router.get("/", (req, res) => {
    res.render("signup");
})

router.post("/", async (req, res) => {
    
    const { name, lastname, username, email, password } = req.body;

    try  {
        
            const user = await User.findOne( { email } )
        
            if (user) {
                res.status(409).json({ message: "el usuario ya existe" });
                return;
            }

    } catch(err) {
        console.log(err);
        return res.status(500).json({message: "hubo un problema"})
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPass = bcrypt.hashSync( password, salt );

   
    const user = new User({
        name,
        lastname,
        username,
        email,
        password: hashPass        
    })

    try {

      await user.save();

      // una vez creado el usuario le redirigimos a otra página:
      req.session.currentUser = user;
      res.redirect("./home")
     // res.status(200).json({ message: "usuario creado correctamente", user })
     

    } catch (error) {
        console.log(err);
        res.status(500).json({message: "hubo un problema"});
    }
})



module.exports = router;