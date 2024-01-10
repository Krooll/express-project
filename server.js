const express = require('express');
const db = require('./public/db');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json(path.join(__dirname, '/public')));

app.get('/testimonials', (req, res) => {
    res.json('testimonials', { testimonials: db });
});

app.post('/testimonials', (req, res) => {
    const { author, text, id } = req.body;
    if(author && text && id) {
        res.json('contact', { message: 'OK' });
      }
      else {
        res.json('contact', { message: 'Something went wrong!' });
      }
});

app.get('/testimonials/:id', (req, res) => {
    const id = req.params.id;
    const activeId = db.find(item => item.id === id);

    res.json('testimonials/:id', { activeId });
});

app.get('/testimonials/random', (req, res) => {
    const random = Math.floor(Math.random() * db.length);
    const randomTestimonial = db[random];

    res.json('testimonials/random', { randomTestimonial });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});