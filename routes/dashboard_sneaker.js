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


router.get("/one-product/:id", (req, res, next) => {
    SneakerModel.findById(req.params.id)
    .then((sneaker) => res.render("one_product", { sneaker }))
    .catch(next);
});


router.get("/prod-edit/:id", (req, res, next) => {
    SneakerModel.findById(req.params.id)
    .then((sneaker) => res.render("product_edit", { sneaker }))
    .catch(next);
});

router.post("/prod-edit/:id", (req, res, next) => {
    const { name, ref, size, description, price, category, id_tags } = req.body;
    SneakerModel.findByIdAndUpdate(req.params.id,req.body)
    .then(() => res.redirect("/sneakers/collection"))
    .catch(next);
});

router.get("/delete/:id", (req, res, next) => {
    SneakerModel.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/sneakers/collection"))
    .catch(next);
});

module.exports = router;
