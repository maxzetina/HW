const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: String,
    position: String,
    level: String,
})
// compile model from schema
module.exports = mongoose.model("records", employeeSchema);
