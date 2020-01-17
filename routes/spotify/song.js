const express = require("express");
const axios = require("axios");
const router = express.Router();
const isLoggedIn  = require("../../middlewares/isLoggedIn");
const Song = require("../../models/Song.js");

router.post("/save",isLoggedIn ,async (request, response) => {
    
    const { id, name } = request.body;

    try {
      const song = new Song({
        id,
        name,
        createdBy: request.session.currentUser._id
      });

      let exist = await Song.count({ id: song.id, createdBy: song.createdBy});
      
      if (exist > 0){
          action = await Song.remove({ id: song.id, createdBy: song.createdBy}) ? "del":"error";
      }
      else{
        action = await song.save() ? "fav":"error";
      }

      response.status(200).json({ result: action });
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: "internal server error" });
    }
});


module.exports = router;