const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const logger = require('morgan');

const app = express();
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

const Contact = mongoose.model('Contact', {
  name: String,
  phone: String,
  birthday: String
})

app.use(express.static(path.join(__dirname, 'build')));
app.use(logger('dev'));
app.use(bodyParser.json())


app.get('/contacts', (req, res) => {
  Contact.find()
  .then(contacts => res.json(contacts))
  .catch(err => res.status(500).end(err.message))
})

app.post('/contacts/new', (req, res) => {
  new Contact(req.body)
  .save()
  .then(contact => res.json(contact))
  .catch(err => res.status(500).end(err.message))
})

app.post('/contacts/:id', (req, res) => {
  Contact.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(contact => res.json(contact))
  .catch(err => res.status(500).end(err.message))
})

app.delete('/contacts/:id', (req, res) => {
  Contact.findByIdAndRemove(req.params.id)
  .then(contact => res.json(contact))
  .catch(err => res.status(500).end(err.message))
})


// DO NOT REMOVE THIS LINE :)
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 1337);