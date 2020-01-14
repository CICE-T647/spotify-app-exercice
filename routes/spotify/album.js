const express = require("express");
const axios = require("axios");
const router = express.Router();
const isLoggedIn  = require("../../middlewares/isLoggedIn");

router.get("/:id",isLoggedIn ,async (request, response) => {
    
    const { id } = request.params;

    try {
        var config = {
            headers: {'Authorization': "Bearer " + request.session.token,
                    'Content-Type': "aplication/json"}
        };
        const data = await axios.get(`https://api.spotify.com/v1/albums/${id}`,config);

        const album = data.data;
        response.render("album", { album: album, loggedIn : request.session.token, username:request.session.currentUser.username });

       
    } catch (error) {
        console.log(error);

        response.redirect('../../auth/logout');
    }
});



module.exports = router;
