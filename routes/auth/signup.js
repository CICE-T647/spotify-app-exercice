const Express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../../models/User.js");

const router = Express.Router();

//get view
router.get("/view", (request, response) => {
    response.render("signup");
  });

//post to create
router.post("/create",async (request, response) => {
  const userForm = { name, lastname, username, email, password } = request.body;
  var fullUrl = request.protocol + '://' + request.get('host') + request.originalUrl;
  //console.log(fullUrl);

  try {

    const user = User.find({ $or: [ { email: userForm.email  }, { username: userForm.name } ] } , 
      function (err, docs) {
          if(err){
            console.log(error);
            return response.status(500).json({ error: "Hubo la función buscar." });
          }

          return docs;
      });
    
    const usersCount = await user.countDocuments({} );
    
    if (usersCount > 0) return response.render("signup",{ error: "El usuario ya existe." });

  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Hubo un problema" });
  }

  const saltRounds = 10;

  const salt = bcrypt.genSaltSync(saltRounds);

  const hashPass = await bcrypt.hashSync(userForm.password, salt);

  const userBD = new User({
    name: userForm.name,
    lastname: userForm.lastname,
    email : userForm.email,
    username: userForm.username,
    password: hashPass
  });

  try {
    await userBD.save();
    response.redirect("../login/view");

  } catch (error) {
    let errors = error.message;
    let arrayErrors = errors.split(',');

    let formattedErrors = arrayErrors.map( function(x) {

      if(x.includes('failed')){
        let y = x.replace('User validation failed:','');
        return y.trim();
      }
      else return  x.trim();
   });

    response.render("signup", { errors: arrayErrors });
  }

});


module.exports = router;