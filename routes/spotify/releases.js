const express = require("express");
const axios = require("axios");
const router = express.Router();
const isLoggedIn  = require("../../middlewares/isLoggedIn");

router.get("/",isLoggedIn ,async (request, response) => {
  try {

    var config = {
        headers: {'Authorization': "Bearer " + request.session.token,
                  'Content-Type': "aplication/json"}
    };
    const data = await axios.get("https://api.spotify.com/v1/browse/new-releases",config);

    const albums = data.data.albums;
        
    response.render("releases", { albums: albums, loggedIn : request.session.token, username:request.session.currentUser.username  });

  } catch (error) {
    console.log(error);

    response.redirect('../../auth/logout');
  }
});

module.exports = router;
