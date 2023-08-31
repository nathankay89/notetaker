const path = require('path');

const path = require('path');

function renderHomePage(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
}

function renderNotesPage(req, res) {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
}

function renderinfoPage(req, res) {
  res.sendFile(path.join(__dirname, '../public/info.html'));
}

module.exports = {
  renderHomePage,
  renderNotesPage,
  renderinfoPage,
};

const express = require('express');

