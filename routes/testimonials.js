const express = require('express');
const uuid = require('uuid');
const db = require('./public/db');
const router = express.Router();

const app = express();

app.get('/testimonials', (req, res) => { // ok1
    res.json({ testimonials: db.testimonials });
});

app.get('/testimonials/random', (req, res) => {  // ok2 
    const random = Math.floor(Math.random() * db.testimonials.length);
    const randomTestimonial = db.testimonials[random];

    res.json({ randomTestimonial });
});

app.get('/testimonials/:id', (req, res) => { // ok3 
    const id = parseInt(req.params.id);
    const activeId = db.testimonials.filter(item => item.id === id);

    res.json({ activeId });
});

app.post('/testimonials', (req, res) => { // ok4
    const randomId = uuid.v4();
    const { author, text } = req.body;
    if(author && text ) {
        const newTest = { id: randomId, author, text }
        res.json( { newTest, message: 'OK' });
      }
      else {
        res.json({ message: 'Something went wrong!'});
      }
});

app.put('/testimonials/:id', (req, res) => { //ok5
    const { author, text } = req.body;
    const id = req.params.id;
    const activeTest = db.testimonials.filter(item => item.id === id);
    if (activeTest) {
        activeTest.author = author;
        activeTest.text = text;
        res.json({ message: 'Testimonial updated'});
    } else {
        res.json({ message: 'Testimonial not found' });
    }
});

app.delete('/testimonials/:id', (req, res) => { //ok
    const id = parseInt(req.params.id);
    const testToDelete = db.testimonials.find(item => item.id === id);
    if(testToDelete){
        db.testimonials.splice(testToDelete, 1);
        res.json({ message: 'OK' });
    }else {
        res.json({ message: 'Something wrong'});
    }
});

module.exports = router;