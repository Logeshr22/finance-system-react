const mongoose = require("mongoose");

const notesSchema = {
    name : String,
    lastName : String,
    email : String,
    username : String,
    password : String
}

//connect to mongodb
const Note = mongoose.model("Note",notesSchema);

module.exports = Note;