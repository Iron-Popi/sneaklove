const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const SneakerModel = require("./../models/Sneaker")
const TagModel = require("./../models/Tag")

router.get("/collection", (req, res, next) => {
    SneakerModel.find().populate("id_tags")
    .then((dbRes) => {
        res.render("products", {sneakers: dbRes});
    })
    .catch((err) =>{
        next(err)
    })
});

// router.get("/collection", (req, res, next) => {
//     TagModel.find()
//     .then((dbRes) => {
//         res.render("products", {tags: dbRes});
//     })
//     .catch((err) =>{
//         next(err)
//     })
// });

router.get("/prod-manage", (req, res, next) => {
    SneakerModel.find()
    .then((dbRes) => {
        res.render("products_manage", {sneakers: dbRes});
    })
    .catch((err) =>{
        next(err)
    })
});

router.get("/prod-add", (req, res, next) => {
    TagModel.find()
    .then((tags) => {
        res.render("products_add", { tags })
    })
    .catch((err) =>{
        next(err)
    })
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

router.post("/tag-add", (req, res, next) => {
    const { label } = req.body;
    TagModel.create(req.body)
    .then(() => {
        res.redirect("/sneakers/prod-add")
    })
    .catch ((err) => {
        next(err)
    })
})

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
