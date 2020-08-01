const express = require('express');
const { readFile } = require('fs').promises;
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  res.send(await readFile('./views/index.html', 'utf8'));
});

app.get('/about', async (req, res) => {
  res.send(await readFile('./views/about.html', 'utf8'));
});

app.get('/contact', async (req, res) => {
  res.send(await readFile('./views/contact.html', 'utf8'));
});

app.listen(8080, () => {
  console.log('App available on http://localhost:8080');
});
