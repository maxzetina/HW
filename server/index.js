const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
// const path = require('path')
// app.use('/static', express.static(path.join(__dirname, 'public')))


const router = express.Router();
app.use(router)

router.get("/api/hello", (req, res) => {
    res.send({status: "Express on Vercel"});
});





const path = require('path')
// const reactPath = path.resolve(__dirname, "..", "client", "public");
// app.use(express.static(reactPath));

// // for all other routes, render index.html and let react router handle it
// app.get("*", (req, res) => {
//   res.sendFile(path.join(reactPath, "index.html"));
// });

if (process.env.NODE_ENV === "production") {
    app.use(express.static("build"));
    app.get("/*", (req, res) => {
        res.sendFile(path.resolve(__dirname,  "build", "index.html"));
    });
}

app.use(express.static(path.resolve(__dirname, '../client/build')));


// Initialize server
app.listen(5000, () => {
    console.log("Server running on port 5000.");
});