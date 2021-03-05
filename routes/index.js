const express = require("express");
const router = express.Router();

console.log(`\n\n
-----------------------------
-----------------------------
     wax on / wax off !
-----------------------------
-----------------------------\n\n`
);

router.get("/", (req, res) => {
  res.render("index");
});

// router.get("/one-product/:id", (req, res) => {
//   res.send("baz");
// });





module.exports = router;
