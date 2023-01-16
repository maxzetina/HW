const express = require('express')
const router = express.Router();

// import models so we can interact with the database
const classes = require("./models/class");


router.get("/hello", (req, res) => {
    res.send({status: "Express on Vercel"});
});

router.get("/classes", (req, res) => {
    classes.find().then((x) => {
        res.send(x)})
});





// anything else falls to this "not found" case
router.all("*", (req, res) => {
    console.log(`API route not found: ${req.method} ${req.url}`);
    res.status(404).send({ msg: "API route not found" });
});
  
module.exports = router;
  