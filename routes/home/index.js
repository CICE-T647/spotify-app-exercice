const express = require("express");
const router = express.Router();
const isLoggedIn = require("../../middlewares/isLoggedIn")
const axios = require("axios")
const token = require("../../spotify-token/getToken")

router.get("/", async (req, res) => {
  try{
    const url = "https://api.spotify.com/v1/browse/new-releases"; 
    const response = await axios.get(url, {
      headers: {
          'Authorization' : `Bearer ${token}`,
          "Content-Type" : "aplication/json"
      }
  });
    console.log(response.data)
    res.render("home", {canciones: response.data}, {user});
  }catch(error){
    console.log(error);
  }
});




module.exports = router;

