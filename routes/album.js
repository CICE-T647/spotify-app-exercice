const express = require("express");
const router = express.Router();
const axios = require("axios");
const getTokenSpotify = require("../spotify-token/getToken");
const { isAutenticated } = require("../middlewares");

router.get("/:id", isAutenticated, async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const token = await getTokenSpotify();
    const url = `https://api.spotify.com/v1/albums/${id}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "aplication/json"
      }
    });
    res.render("album", {
      tracks: response.data.tracks.items,
      data: response.data,
      user: user
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
