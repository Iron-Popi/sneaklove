const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)

router.get("/collection", (req, res) => {
    res.render("products");
});

// router.get()

module.exports = router;
