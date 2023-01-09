const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
const router = express.Router();
app.use(router)

router.get("/hello", (req, res) => {
    res.send({f: "Express on Vercel"});
  });
  
  // Initialize server
app.listen(5000, () => {
    console.log("Server running on port 5000.");
});