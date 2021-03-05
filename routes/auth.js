const express = require("express");
const router = new express.Router();
const bcrypt = require('bcrypt');
const UserModel = require('./../models/User');


router.get("/signin", (req, res) => {
    res.render("signin");
});

router.post("/signin", async (res, req, next) => {
    const {email, password} = req.body;
    const foundUser = await UserModel.findOne({email : email});

    if(!foundUser) {
        res.redirect("/signin")
    } else {
        const isSamePassword = bcrypt.compareSync(password, foundUser.password);

        if(!isSamePassword) {
            res.redirect("/signin")
        } else {
            const userObject = foundUser.toObject();
            delete userObject.password;

            req.session.currentUser = userObject;

            res.redirect("/")
        }
    }
});

router.get("/signup", (req, res) => {
    res.render("signup");
});



module.exports = router;