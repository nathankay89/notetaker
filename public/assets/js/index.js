// Selecting the necessary elements from the DOM
let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

if (window.location.pathname === '/notes') {
  // Selecting elements for note input, buttons, and note list
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveNoteBtn = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  noteList = document.querySelectorAll('.list-container .list-group');
}
// Utility functions to show and hide elements
const show = (elem) => {
  elem.style.display = 'inline';
};

const hide = (elem) => {
  elem.style.display = 'none';
};
// Store for the active note being edited or viewed
let activeNote = {};
// Fetches all notes from the server
const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
// Sends a new note to the server for saving
const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
// Deletes a note from the server by its ID
const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
// Updates the display to show the active note's details
const renderActiveNote = () => {
  hide(saveNoteBtn);

  if (activeNote.id) {
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
  } else {
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');
    noteTitle.value = '';
    noteText.value = '';
  }
};
// Creates an HTML list item for a note
const createLi = (text, delBtn = true) => {
  const liEl = document.createElement('li');
  liEl.classList.add('list-group-item');

  const spanEl = document.createElement('span');
  spanEl.classList.add('list-item-title');
  spanEl.innerText = text;
  spanEl.addEventListener('click', handleNoteView);

  liEl.append(spanEl);

  if (delBtn) {
    const delBtnEl = document.createElement('i');
    delBtnEl.classList.add(
      'fas',
      'fa-trash-alt',
      'float-right',
      'text-danger',
      'delete-note'
    );
    delBtnEl.addEventListener('click', handleNoteDelete);

    liEl.append(delBtnEl);
  }

  return liEl;
};
// Handles saving a note
const handleNoteSave = () => {
  const newNote = {
    id: Date.now(), // Generate a unique ID based on current timestamp
    title: noteTitle.value,
    text: noteText.value,
  };
  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};
// Handles deleting a note
const handleNoteDelete = (e) => {
  e.stopPropagation();
  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};
// Handles viewing a note
const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  renderActiveNote();
};
// Handles creating a new note view
const handleNewNoteView = (e) => {
  activeNote = {};
  renderActiveNote();
};
// Updates the visibility of the save button
const handleRenderSaveBtn = () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};
// Renders the list of notes
const renderNoteList = async (notes) => {
  let jsonNotes = await notes.json();
  console.log(jsonNotes);
  if (window.location.pathname === '/notes') {
    noteList.forEach((el) => (el.innerHTML = ''));
  }

  let noteListItems = [];

  jsonNotes.forEach((note, index) => {
    if (note && note.title) {
      const li = createLi(note.title);
      li.dataset.note = JSON.stringify(note);
      noteListItems.push(li);
    } else {
      console.log(`Note at index ${index} is invalid:`, note);
    }
  });

  if (window.location.pathname === '/notes') {
    noteListItems.forEach((note) => noteList[0].append(note));
  }
};
// Fetches and renders the list of notes
const getAndRenderNotes = () => getNotes().then(renderNoteList);
// Adding event listeners for various actions
if (window.location.pathname === '/notes') {
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  noteTitle.addEventListener('keyup', handleRenderSaveBtn);
  noteText.addEventListener('keyup', handleRenderSaveBtn);
}
// Initial fetching and rendering of notes
getAndRenderNotes();