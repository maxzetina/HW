const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require("mongoose");
require("dotenv").config();

// const path = require('path')
// app.use('/static', express.static(path.join(__dirname, 'public')))

const mongoConnectionURL = process.env.MONGODB_URI;
// TODO change database name to the name you chose
const databaseName = "employees";

// connect to mongodb
mongoose
  .connect(mongoConnectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: databaseName,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));

app.use(cors())
app.use(express.json())
const router = express.Router();
app.use("/api", router)


router.get("/hello", (req, res) => {
    res.send({status: "Express on Vercel"});
});
const emp = require("./models/employee");

router.get("/emps", (req, res) => {
    emp.find({name : req.query.name}).then((userFound) => {
        console.log(userFound);
        res.send(userFound)})
});


const path = require('path')
// const reactPath = path.resolve(__dirname, "..", "client", "public");
// app.use(express.static(reactPath));

// // for all other routes, render index.html and let react router handle it
// app.get("*", (req, res) => {
//   res.sendFile(path.join(reactPath, "index.html"));
// });

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, '../client/build')));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname,  "build", "index.html"));
    });
}


// Initialize server
app.listen(5000, () => {
    console.log("Server running on port 5000.");
});