const express = require('express')
const app = express()

app.get("/hello", (req, res) => {
    res.send("Express on Vercel");
  });
  
  // Initialize server
  app.listen(5000, () => {
    console.log("Server running on port 5000.");
  });