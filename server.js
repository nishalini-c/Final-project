const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL


mongoose.connect(mongoString);
const app = express();
const database = mongoose.connection


app.use(express.json());
app.get('/', (req, res) => res.send('Server is ready'));

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
}) 

app.listen(8000, () => {
    console.log(`Server Started at ${8000}`)
})