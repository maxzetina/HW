const express = require('express')
const router = express.Router();

// import models so we can interact with the database
const classes = require("./models/class");

router.get("/classes", (req, res) => {
    classes.find().then((x) => {res.send(x)})
});

router.post("/addClass", (req, res) => {
    console.log(req);
    const newClass = new classes ({
        name: req.body.name,
        assignments: req.body.assignments,
        lecturesRecorded: false,
        lateDays: 20,
        missableRecsLeft: 2,
        psetDroppable: true,
        psetDropped: true
    });
    
    newClass.save().then(() => res.send({status: 'success'}))

})



// anything else falls to this "not found" case
router.all("*", (req, res) => {
    console.log(`API route not found: ${req.method} ${req.url}`);
    res.status(404).send({ msg: "API route not found" });
});
  
module.exports = router;
  