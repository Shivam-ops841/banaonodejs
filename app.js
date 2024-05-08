const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const appRoutes = require('./routes/appRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/social_media')
    .then(() => {
        console.log('Connected to MongoDB');
        // Start the server after successfully connecting to the database
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/v2', appRoutes);

module.exports = app;
