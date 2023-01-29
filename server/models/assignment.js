const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
    quiz: Boolean,
    name: String,
    dueDate: Date,
    class: String
})
// compile model from schema
module.exports = mongoose.model("assignments", assignmentSchema);
