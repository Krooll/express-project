const express = require('express');
const cors = require('cors')

const app = express();

// import routes
const testimonialsRoutes = require('./routes/testimonials');
const concertsRoutes = require('./routes/concerts');
const seatsRoutes = require('./routes/seats');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);
app.use((req, res) => { 
    res.status(404).send({ message: '404 not found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});