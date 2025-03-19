const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');


// Routes
const indexRouter = require('./routes/index');
const scheduleRouter = require('./routes/schedule');
const syllabusRouter = require('./routes/syllabus');
const studyRouter = require('./routes/study');

// Express
const app = express();

// Mongoose
let connectionStr = 
    "place connection string from mongodb cloud database here!"; // Removed key for privacy

mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(connectionStr);
}

// View Engine
app.set('views', path.join(__dirname, 'views'));  // go to current directory, go to views, that is our 'views'
app.set('view engine', 'pug');  // all of our views will be written in pug

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Create web pages
app.use('/', indexRouter);
app.use('/schedule', scheduleRouter);
app.use('/study', studyRouter);
app.use('/syllabus', syllabusRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;