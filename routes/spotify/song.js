const express = require("express");
const axios = require("axios");
const router = express.Router();
const isLoggedIn  = require("../../middlewares/isLoggedIn");
const Song = require("../../models/Song.js");

router.post("/save",isLoggedIn ,async (request, response) => {
    
    const { id, name } = request.body;
    console.log(request.session.currentUser);
    try {
      const song = new Song({
        id,
        name,
        createdBy: request.session.currentUser._id
      });

      await song.save();

      response.status(200).json({ song });
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: "internal server error" });
    }
});


module.exports = router;