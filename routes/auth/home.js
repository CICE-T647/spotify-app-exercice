const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const User = require("../../models/User");
const getToken = require("../../spotify-token/getToken");
const axios = require("axios");

const isLoggedIn = require("../../middlewares/isLoggedIn");

// para renderizar la vista:
router.get("/", isLoggedIn, async (req, res) => {
   
    const usuario = req.session.currentUser;
    const token =  await getToken();
    const url = "https://api.spotify.com/v1/browse/new-releases";

  
try {

    const respuesta =  await axios.get(url, {headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' }});
    console.log(respuesta.data.albums.items)
    res.render("home", {usuario: usuario, respuesta: respuesta});

} catch(err) {
    console.log("error es: ", err)
}


});

module.exports = router;