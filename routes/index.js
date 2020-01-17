const express = require("express");
const router = express.Router();

router.get("/home",(request, response) => {

    response.render("home",{loggedIn : request.session.token });

});

module.exports = router;
