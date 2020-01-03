module.exports = (req, res, next) => {
    console.log(req.session.currentUser)
        req.session.currentUser 
        ? next() 
        : res.redirect("/")
    }