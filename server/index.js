const express = require('express')
const cors = require('cors')
const mongoose = require("mongoose");
const api = require("./api");
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())
app.use("/api", api)

require("dotenv").config();

const mongoConnectionURL = process.env.MONGODB_URI;
const databaseName = "ToDoList";

mongoose.set('strictQuery', true);
mongoose.connect(mongoConnectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: databaseName,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`Error connecting to MongoDB: ${err}`)
);

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.resolve(__dirname, '../client/build')));
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname,  "build", "index.html"));
//     });
// }

// Initialize server
app.listen(5000, () => {
    console.log("Server running on port 5000.");
});