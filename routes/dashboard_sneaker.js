const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const SneakerModel = require("./../models/Sneaker")

router.get("/collection", (req, res, next) => {
    SneakerModel.find()
    .then((dbRes) => {
        res.render("products", {sneakers: dbRes});
    })
    .catch((err) =>{
        next(err)
    })
});

router.get("/prod-add", (req, res, next) => {
    res.render("products_add")
});


router.post("/prod-add", async (req, res, next) => {
    const newSneaker = { ...req.body}
    try {
        await SneakerModel.create(newSneaker);
        res.redirect("/sneakers/collection")
    } catch (err) {
        next(err);
      }
});

module.exports = router;
