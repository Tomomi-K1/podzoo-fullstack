"use strict";
/* == dependencies == */
const express = require('express');
const cors = require('cors');
// const { authenticateJWT } = require("./middleware/auth");
// const morgan = require('morgan');
/* == errors ==*/
const { NotFoundError } = require("./expressError");
/* == Routes ==*/
const userRoutes = require('./routes/users');

const app = express();

app.use(cors());
// app.use(morgan('tiny')); /**dev? */

/**== allow json and form data parsing == */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**== Routes == */
app.use('/users', userRoutes);


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

// app.get('/', async function(req, res){
    // const result = await api.podcastsTrending(max=20, lang='en')
    // return res.json(result)
    // const result = await api.categoriesList()
    // return res.json(result)

    // const result =await api.episodesByFeedId(227573)
    // return res.send(result)
// })