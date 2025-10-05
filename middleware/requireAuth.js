function requireAuth(req, res, next) {
    if (req.session && req.session.user) {
    //    req.user = req.session.user;
       return next();
    }
    return res.render("login", { message: "Please login to access this page" });
}

module.exports = requireAuth;