const express = require('express')
const router = express.Router();

// import models so we can interact with the database
const emp = require("./models/employee");


router.get("/hello", (req, res) => {
    res.send({status: "Express on Vercel"});
});

router.get("/emps", (req, res) => {
    emp.find({name : req.query.name}).then((userFound) => {
        console.log(userFound);
        res.send(userFound)})
});





// anything else falls to this "not found" case
router.all("*", (req, res) => {
    console.log(`API route not found: ${req.method} ${req.url}`);
    res.status(404).send({ msg: "API route not found" });
});
  
module.exports = router;
  