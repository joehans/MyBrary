if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

//App Dependencies 
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');
const mongoose = require('mongoose');

//App View Setup
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

//Database connection
mongoose.connect(process.env.DATABASE_URL, {useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.on('open', () => console.log('Connected to Mongoose'));

//App routes
app.use('/', indexRouter);

//App ports
app.listen(process.env.PORT || 3000);

