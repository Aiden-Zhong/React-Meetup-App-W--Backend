const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const meetups = require('./routes/Meetups');
const connectDB = require('./config/connectDB');


dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));



if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/v1/meetups', meetups);

const PORT = process.env.PORT;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`.yellow.bold));