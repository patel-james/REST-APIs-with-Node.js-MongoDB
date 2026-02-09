require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const MONGOURI = process.env.MONGOURI;
const PORT = process.env.PORT || 8000;
const User = require('./models/User');
const connectDB = require('./config/db');
const routes = require('./routes/user');
const routes_ping = require('./routes/ping');
const app = express();

app.use(express.json());
app.use('/api/users', routes)
app.use('/ping', routes_ping);


connectDB(process.env.MONGOURI);






app.listen(PORT, () => {
    console.log(`The application is running at http://localhost:${PORT}/`);
});

