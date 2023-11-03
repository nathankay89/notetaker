const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

// Get the absolute path to the db.json file
const dbFilePath = path.join(__dirname, 'db', 'db.json');

// Route to get all notes
router.get('/notes', (req, res) => {
  // Read the contents of the db.json file
  const notesData = JSON.parse(fs.readFileSync(dbFilePath));

  // Send the notes data as a JSON response
  res.json(notesData);
});

router.post('/notes', (req, res) => {
  try {
    const newNote = req.body;

    // Read the current notes from db.json
    const notesData = JSON.parse(fs.readFileSync(dbFilePath));

    // Add the new note to the notes array
    notesData.push(newNote);

    // Write the updated notes array back to db.json
    fs.writeFileSync(dbFilePath, JSON.stringify(notesData));

    // Send the newly created note as a JSON response
    res.json(newNote);
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).send('Error creating note');
  }
});



// Route to delete a note by ID
router.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;

  // Read the current notes from db.json
  let notesData = JSON.parse(fs.readFileSync(dbFilePath));

  // Filter out the note with the specified ID
  notesData = notesData.filter(note => note.id !== noteId);

  // Write the updated notes array back to db.json
  fs.writeFileSync(dbFilePath, JSON.stringify(notesData));

  // Send a success response
  res.status(200).send('Note deleted successfully');
});

module.exports = router;