const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT;
const {errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./config/dbcon');
const cors = require('cors');

connectDB()
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors({origin:"*"}));

app.use('/api/users', require('./route/userRoute'));
app.use('/api/gps', require('./route/gpsRoute'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on ${port}...!`));