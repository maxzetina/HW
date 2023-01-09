const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())

// const path = require('path')
// app.use('/static', express.static(path.join(__dirname, 'public')))


const router = express.Router();
app.use(router)

router.get("/hello", (req, res) => {
    res.send({status: "Express on Vercel"});
  });
  
  // Initialize server
app.listen(5000, () => {
    console.log("Server running on port 5000.");
});