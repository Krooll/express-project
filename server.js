const express = require('express');
const uuid = require('uuid');
const db = require('./public/db');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get('/testimonials', (req, res) => {
    res.json({ testimonials: db });
});

app.post('/testimonials', (req, res) => {
    const randomId = uuid.v4();
    const { author, text } = req.body;
    if(author && text ) {
        const newTest = { id: randomId, author, text }
        res.json( newTest, { message: 'OK' });
      }
      else {
        res.json({ message: 'Something went wrong!'});
      }
});

app.put('/testimonials/:id', (req, res) => {
    const { author, text } = req.body;
    const id = req.params.id;
    const activeTest = db.find(item => item.id === id);
    if (activeTest) {
        activeTest.author = author;
        activeTest.text = text;
        res.json({ message: 'Testimonial updated', activeTest });
    } else {
        res.json({ message: 'Testimonial not found' });
    }
});

app.delete('/testimonials/:id'), (req, res) => {
    const id = req.params.id;
    const testToDelete = db.findIndex(item => item.id === id);
    const deleteTest = db.splice(testToDelete, 1);
    res.json({ message: 'OK',  deleteTest });
};

app.get('/testimonials/:id', (req, res) => {
    const id = req.params.id;
    const activeId = db.find(item => item.id === id);

    res.json({ activeId });
});

app.get('/testimonials/random', (req, res) => {
    const random = Math.floor(Math.random() * db.length);
    console.log('random', random);
    const randomTestimonial = db[random];

    res.json({ randomTestimonial });
});

app.use((req, res) => {
    res.status(404).send({ message: '404 not found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});