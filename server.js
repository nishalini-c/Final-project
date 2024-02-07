const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const {  notFound, formatErrorHandler } = require('./middleware/errorMiddleware');

const port = process.env.PORT || 8000;

const userRoutes = require('./routes/userRoutes');
// const menuRoutes = require('./routes/menuRoutes');
// const OrderRoutes = require('./routes/orderRoutes');
// const ReservationRoutes = require('./routes/ReservationRoutes');
// const catogaryRoutes = require('./routes/catogaryRoutes');

const app = express();
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;


 app.use(notFound);
app.use(formatErrorHandler)
app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());

app.use('/api/users', userRoutes);
// app.use('/api/items', menuRoutes);
// app.use('/api/order', OrderRoutes);
// app.use('/api/table', ReservationRoutes);
// app.use('/api/category', catogaryRoutes);

 app.get('/', (req, res) => res.send('Server is ready'));;

app.listen(port, () => console.log(`Server started on port ${port}`));

database.on('error', (error) => {
    console.log(error)
});

database.once('connected', () => {
    console.log('Database Connected')
});