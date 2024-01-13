const express = require('express');
const router = express.Router();
const db = require('../public/db');
const uuid = require('uuid');

router.route('/seats').get((req, res) => { // ok1
    res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => { // ok3 
    const id = parseInt(req.params.id);
    const activeId = db.seats.filter(item => item.id === id);

    res.json({ activeId });
});

router.route('/seats').post((req, res) => { // ok4
    const randomId = uuid.v4();
    const { day, seat } = req.body;

    const reservedSeat = db.seats.some(item => item.day === day && item.seat === seat);

    if(!reservedSeat) {
        const newSeat = { id: randomId, day, seat }
        db.seats.push(newSeat);
        res.status(200).json( { newSeat, message: 'Seat reserved' });
      }
      else {
        res.status(400).json({ message: 'The slot is already taken...!'});
      }
});

router.route('/seats/:id').put((req, res) => { //ok5
    const { author, text } = req.body;
    const id = req.params.id;
    const activeTest = db.seats.find(item => item.id === id);
    if (activeTest) {
        activeTest.author = author;
        activeTest.text = text;
        res.json({ message: 'Seat updated'});
    } else {
        res.json({ message: 'Testimonial not found' });
    }
});

router.route('/seats/:id').delete((req, res) => { //ok
    const id = req.params.id;
    const testToDelete = db.seats.find(item => item.id === id);
    if(testToDelete){
        db.seats.splice(db.seats.indexOf(testToDelete), 1);
        res.json({ message: 'OK' });
    }else {
        res.json({ message: 'Something wrong'});
    }
});

module.exports = router;