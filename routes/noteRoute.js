const express = require("express");
const router = express.Router();
const Note = require("../models/noteModel");

router.route("/Register").post((req,res)=>{
    const name = req.body.name;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const newNote = new Note({
        name,
        lastName,
        email,
        username,
        password
    });
    newNote.save();
})
router.route("/notes").get((req,res)=>{
    Note.find()
        .then(foundNotes => res.json(foundNotes));
})
module.exports = router;

