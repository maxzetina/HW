const express = require('express')
const router = express.Router();

// import models so we can interact with the database
const classes = require("./models/class");
const assignments = require("./models/assignment");


const mysql = require("mysql");

const con = mysql.createConnection({
  host: "sql.mit.edu",
  user: "la_casa",
  password: "la_casa-webmaster",
  database: "la_casa+site"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to La Casa!");
});

router.post("/saves", (req,res) => {
    // console.log(`'${req.body.name}'`);
    // res.send({})
    con.query(`INSERT INTO saves (name, day, request) VALUES ('${req.body.name}', '${req.body.day}', '${req.body.request}')`, function (err, result) {
        if (err) throw err;
        res.send(result);
      });
})




router.get("/classes", (req, res) => {
    classes.find().then((x) => {res.send(x)})
});

router.get("/getClass", (req, res) => {
    classes.findById(req.query.id).then((x) => {res.send(x)});
});

router.post("/addClass", (req, res) => {
    console.log(req)
    const newClass = new classes ({
        name: req.body.name,
        assignments: [],
        lecturesRecorded: req.body.lecturesRecorded,
        lateDays: req.body.lateDays,
        missableRecsLeft: req.body.missableRecsLeft,
        psetDroppable: req.body.psetDroppable,
        psetDropped: false,
        OH: req.body.OH
    });
    
    newClass.save().then(() => res.send({status: 'success'}))
});

router.post("/editClass", (req, res) => {
    classes.findByIdAndUpdate(req.body.id, 
        {lecturesRecorded: req.body.lecturesRecorded,
        lateDays: req.body.lateDays, 
        missableRecsLeft: req.body.missableRecsLeft,
        psetDroppable: req.body.psetDroppable,
        psetDropped: req.body.psetDropped,
        OH: req.body.OH}).then(() => res.send({}));
});

router.post("/deleteClass", (req, res) => {
    classes.findByIdAndDelete(req.body.id).then(() => res.send({}));
});

router.post("/addAssignment", (req, res) => {
    classes.findByIdAndUpdate(req.body.id, {$push: {assignments: req.body.assignment}}).then(() => {
        const newAssignment = new assignments ({
            quiz: req.body.assignment.quiz,
            name: req.body.assignment.name,
            dueDate: req.body.assignment.dueDate,
            class: req.body.className,
        });
        newAssignment.save().then(() => res.send({}))
    });
});

router.get("/assignments", (req, res) => {
    assignments.find().then((x) => {res.send(x)})
});

router.post("/deleteClassAssignments", (req, res) => {
    assignments.deleteMany({class: req.body.className}).then(() => res.send({}));
});

router.post("/deleteAssignments", (req, res) => {
    assignments.deleteMany({_id: {$in: req.body.assignmentIDs}}).then(() => res.send({}))
});

router.post("/deleteAssignmentsFromClasses", (req, res) => {
    classes.findOneAndUpdate({name: req.body.className}, {$pull: {assignments: req.body.assignment}}).then(() => res.send({}))
});

router.get("/extras", (req, res) => {
    assignments.find({class: req.query.className}).then((x) => {res.send(x)});
});

router.post("/addExtra", (req, res) => {
    console.log(req)
    const newAssignment = new assignments ({
        quiz: req.body.quiz,
        name: req.body.name,
        dueDate: req.body.dueDate,
        class: req.body.className,
    });
    newAssignment.save().then(() => res.send({}))
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
    console.log(`API route not found: ${req.method} ${req.url}`);
    res.status(404).send({ msg: "API route not found" });
});
  
module.exports = router;
  