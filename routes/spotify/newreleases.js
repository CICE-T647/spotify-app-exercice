const express = require("express");
const router = express.Router();
const axios = require("axios");
const getSpotifyToken = require("../../controller/getSpotifyToken");
require("dotenv").config();

const spotify_api = process.env.SPOTIFY_API;

router.get("/", async (req, res) => {
    const url = `${spotify_api}browse/new-releases?country=ES`;
    try {
        const spotify_token = await getSpotifyToken();
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${spotify_token}`,
                "Content-Type": "aplication/json"
            }
        });
        res.status(200).json({ message: response.data });
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

module.exports = router;
