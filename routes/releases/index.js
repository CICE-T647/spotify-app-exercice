const express = require("express");
const router = express.Router();
const isLoggedIn = require("../../middlewares/isLoggedIn")
const axios = require("axios")
const getTokenSpotify = require("../../spotify-token/getToken")

router.get("/", async (req, res) => {
  // const user = req.session.currentUser 
  try{
    const url = "https://api.spotify.com/v1/browse/new-releases?country=ES"; 
    const token = await getTokenSpotify();
    const response = await axios.get(url, {
      headers: {
          // Authorization : "Bearer BQALXINFSWJUpnkK-kvHyWHQ5WVxcF0c_vbS0cZvLuLmHuL8heYOJEaqhJw01X6DF-sX2T5mcgZW2dmtA7UXeUY9gczTdKdTnFb5FkKDi5taoH9EGwmP3snl5UYPvozqK3haL0XmZ7DPPakJ0TQTtTpK17p5nXk1pT25N_58nUM5prRGju-33n7XzQm3DS_zQak26L_Ti2YY1KA5WkLBjPzPeqlFXrkdG96GGEDfATtXoUgtbJwScPGGmx2wky1das7yA5sU", 
          Authorization:  "Bearer "+ token,
          "Content-Type" : "aplication/json" 
      }
    });
    // console.log(response.data.albums.items)
    res.render("home", {albums: response.data.albums.items, user:user});
  }catch(error){
    res.status(500).json({ message: error });
    console.log(error);
  }
});




module.exports = router;

