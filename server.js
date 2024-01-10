const express = require('express');
const uuid = require('uuid');
const db = require('./public/db');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/testimonials', (req, res) => { // ok1
    res.json({ testimonials: db });
});

app.get('/testimonials/random', (req, res) => {  // ok2 
    const random = Math.floor(Math.random() * db.length);
    const randomTestimonial = db[random];

    res.json({ randomTestimonial });
});

app.get('/testimonials/:id', (req, res) => { // ok3 
    const id = parseInt(req.params.id);
    const activeId = db.filter(item => item.id === id);
    console.log(activeId)

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
    const activeTest = db.filter(item => item.id === id);
    if (activeTest) {
        activeTest.author = author;
        activeTest.text = text;
        res.json({ message: 'Testimonial updated'});
    } else {
        res.json({ message: 'Testimonial not found' });
    }
});

app.delete('/testimonials/:id'), (req, res) => {
    const id = parseInt(req.params.id);
    const testToDelete = db.find(item => item.id === id);
    if(testToDelete){
        db = db.filter(item => item.id !== id);
        res.json({ message: 'OK' , deletedTestimonial: testToDelete});
    }else {
        res.json({ message: 'Something wrong'});
    }
};

app.use((req, res) => { // ok7
    res.status(404).send({ message: '404 not found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});