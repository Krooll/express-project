const express = require('express');

const app = express();

// import routes
const testimonialsRoutes = require('../routes/testimonials');
const concertsRoutes = require('../routes/concerts');
const seatsRoutes = require('../routes/seats');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/testimonials', testimonialsRoutes);
app.use('/concerts', concertsRoutes);
app.use('/seats', seatsRoutes);
app.use((req, res) => { // ok7
    res.status(404).send({ message: '404 not found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});