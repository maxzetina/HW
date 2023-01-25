const express = require('express')
const router = express.Router();

// import models so we can interact with the database
const classes = require("./models/class");

router.get("/classes", (req, res) => {
    classes.find().then((x) => {res.send(x)})
});

router.get("/getClass", (req, res) => {
    classes.findById(req.query.id).then((x) => {res.send(x)});
});

router.post("/addClass", (req, res) => {
    const newClass = new classes ({
        name: req.body.name,
        assignments: [],
        lecturesRecorded: req.body.lecturesRecorded,
        lateDays: req.body.lateDays,
        missableRecsLeft: req.body.missableRecsLeft,
        psetDroppable: req.body.psetDroppable,
        psetDropped: false
    });
    
    newClass.save().then(() => res.send({status: 'success'}))
});

router.post("/editClass", (req, res) => {
    classes.findByIdAndUpdate(req.body.id, 
        {lecturesRecorded: req.body.lecturesRecorded,
        lateDays: req.body.lateDays, 
        missableRecsLeft: req.body.missableRecsLeft,
        psetDroppable: req.body.psetDroppable,
        psetDropped: req.body.psetDropped}).then(() => res.send({}));
});

router.post("/deleteClass", (req, res) => {
    classes.findByIdAndDelete(req.body.id).then(() => res.send({}));
});



// anything else falls to this "not found" case
router.all("*", (req, res) => {
    console.log(`API route not found: ${req.method} ${req.url}`);
    res.status(404).send({ msg: "API route not found" });
});
  
module.exports = router;
  