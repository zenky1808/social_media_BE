require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT;
const logger = require('morgan');
const helmet = require('helmet');


const db = require('./configs/db')
const route = require('./routes/index');

//app use
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet())
// app.use(express.static(path.join(__dirname, 'public')));

//connect db
db.connect();

//Route use
route(app);
app.listen(port, () => {
  console.log(`Server app is running at http://localhost:${port}`)
});