const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Import routes
const testimonialsRoutes = require('./routes/testimonials');
const concertsRoutes = require('./routes/concerts');
const seatsRoutes = require('./routes/seats');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.use(express.static(path.join(__dirname, 'clients/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'clients/build', 'index.html'));
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});