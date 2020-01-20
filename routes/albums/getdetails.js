const express = require("express");
const router = express.Router();
const axios = require("axios");
const getToken = require("../../spotify-token/getToken");
const isLoggedIn = require("../../middlewares/isLoggedIn");

router.get("/:id", isLoggedIn, async (req, res) => {

    const usuario = req.session.currentUser;

    const { id } = req.params;
    const token =  await getToken();    

    try {
        // https://developer.spotify.com/documentation/web-api/reference/browse/get-list-new-releases/
        const response = await await axios.get(`https://api.spotify.com/v1/albums/${id}`, {headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' }});

        console.log("detalles del album ", response.data.artists)
    
        res.render("albumDetails", {usuario: usuario, album: response.data });

    } catch(error) {
        console.log(error);       
    }
})


module.exports = router;