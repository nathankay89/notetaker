const express = require('express');
const router = express.Router();

let notes = [
    {id:1, title : 'First note', text : 'First sample note'},
    {id:2, title : 'Second note', text : 'Second sample note'},
];

// API || routes get from JSON

router.get('/notes', (req, res) => {
    res.json(notes);    
});

// API || routes post 

router.post('/notes', (req, res) => {
    const { title, text } = req.body;
  
    if (!title || !text) {
      return res.status(400).json({ error: 'Both title and text are required.' });
    }
  
    const newNote = {
      id: notes.length + 1,
      title,
      text
    };
  
    notes.push(newNote);
  
    return res.status(201).json(newNote);
  });

// API || routes delete

router.delete('/notes/:id', (req, res) => {
    const noteId = parseInt(req.params.id);
  
    const noteIndex = notes.findIndex(note => note.id === noteId);
    
    if (noteIndex === -1) {
      return res.status(404).json({ error: 'Note has not been found.' });
    }
    
    notes.splice(noteIndex, 1);
  
    return res.status(204).send();
  });
  
    // delet note from JSON

  module.exports = router;