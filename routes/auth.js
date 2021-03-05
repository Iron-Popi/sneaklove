const express = require("express");
const router = new express.Router();
const bcrypt = require('bcrypt');
const UserModel = require('./../models/User');


router.get("/signin", (req, res) => {
    res.render("signin");
});

router.post("/signin", async (res, req, next) => {
    console.log(req.body);
    try { const { email, password } = req.body;
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
    }} catch (err) {
        next(err);
    }
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.post("/signup", async (req, res, next) => {
    try {
        const newUser = { ...req.body };
        const foundUser = await UserModel.findOne({email: newUser.email});

        if(foundUser) {
            res.redirect("/signin");
            console.log("Already registered");
        } else {
            const hashedPassword = bcrypt.hashSync(newUser.password, 10);
            newUser.password = hashedPassword;

            await UserModel.create(newUser);
            res.redirect("/signin")
            console.log("success");
        }
    } catch(err) {
        next(err)
    }
})

router.get("/signout", (req,res,next) => {
    req.session.destroy(function (err) {
     res.redirect("/")
    })
})



module.exports = router;