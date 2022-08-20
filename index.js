const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/connectDB');
const errorHandler = require('./middleware/errorHandler');

require('dotenv').config();

const PORT = process.env.PORT || 4000;

const app = express()

// Connect to MongoDB
connectDB();

// Cross Origin Resource Sharing
// app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/user'));

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});