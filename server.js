const express = require('express');
const db = require('./public/db');
const path = require('path');
const uuid = require('uuid');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json(path.join(__dirname, '/public')));

app.get('/testimonials', (req, res) => {
    res.json('testimonials', { testimonials: db });
});

app.post('/testimonials', (req, res) => {
    const randomId = uuid.v4();
    const { author, text } = req.body;
    if(author && text ) {
        const newTest = { id: randomId, author, text }
        res.json('contact', newTest, { message: 'OK' });
      }
      else {
        res.json('contact', { message: 'Something went wrong!' });
      }
});

app.put('/testimonials/:id', (req, res) => {
    const { author, text } = req.body;
    const id = req.params.id;
    const activeTest = db.find(item => item.id === id);
    if (activeTest) {
        activeTest.author = author;
        activeTest.text = text;
        res.json({ message: 'Testimonial updated', updatedTestimonial: activeTest });
    } else {
        res.json({ message: 'Testimonial not found' });
    }
});

app.delete('/testimonials/:id'), (req, res) => {
    const id = req.params.id;
    const deleteTest = db.filter(item => item.id !== id);

    res.json('testimonials/:id', { message: 'OK',  deleteTest });
};

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

app.use((req, res) => {
    res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});