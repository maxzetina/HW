const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    name: String,
    assignments: Array,
    lecturesRecorded: Boolean,
    lateDays: Number,
    missableRecsLeft: Number,
    psetDroppable: Boolean,
    psetDropped: Boolean,
    OH: Array
})
// compile model from schema
module.exports = mongoose.model("classes", classSchema);
