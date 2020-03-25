const express = require("express");
const router = express.Router();
const axios = require("axios");
const getTokenSpotify = require("../spotify-token/getToken");
const { isAutenticated, isUserActive } = require("../middlewares");

router.get("/", [isAutenticated, isUserActive], async (req, res) => {
  const user = req.user;
  try {
    const url = "https://api.spotify.com/v1/browse/new-releases?country=ES";
    const token = await getTokenSpotify();
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "aplication/json"
      }
    });

    //res.render("home", { albums: response.data.albums.items, user: user });
    res.json({ data: response.data.albums.items });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
});

module.exports = router;
