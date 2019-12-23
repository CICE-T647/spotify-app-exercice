const express = require("express");
const axios = require("axios");
const router = express.Router();
//const isAdminRole = require("../../middlewares/isAdminRole");

router.get("/", async (request, response) => {
  try {
    console.log(request.session.token);
    var config = {
        headers: {'Authorization': "Bearer " + request.session.token,
                  'Content-Type': "aplication/json"}
    };
    const data = await axios.get("https://api.spotify.com/v1/browse/new-releases?country=SE&limit=10&offset=5",config);

    console.log(data.data.albums);

    response.status(200).json({ message: data.data.albums });
    //res.render("beers", { beers: response.data });
  } catch (error) {
    console.log(error);
    response.status(200).json({error: error});
  }
});

module.exports = router;
