"use strict";
/* == dependencies == */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

/* == errors ==*/
const { NotFoundError } = require("./expressError");
/* == middleware ==*/
const { authenticateJWT } = require("./middleware/auth");
/* == Routes ==*/
const userRoutes = require('./routes/users');
const podRoutes = require('./routes/podcasts');

const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
// app.use(authenticateJWT);

/**== Routes == */
app.get('/', (req,res) => {
  return res.send("hello, it works!");
})

app.use('/users', userRoutes);
app.use('/podcasts', podRoutes);


/** == Handle 404 errors == */
app.use(function (req, res, next) {
    return next(new NotFoundError());
  });

/** == Generic error handler; anything unhandled goes here. == */
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== 'test') console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;
  
    return res.status(status).json({
      error: { message, status },
    });
  });



module.exports = app;
