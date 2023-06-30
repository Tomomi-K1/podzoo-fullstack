const express = require('express');
// const cors = require("cors");

/**== EXTERNAL API related == */
const { API_KEY, API_SECRET } = require('./secret')
const api = require('podcast-index-api')(API_KEY, API_SECRET) 

/**== Routes == */
const userRoute = require('./users');

const app = express();
// app.use(cors());

/**== allow json and form data parsing == */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', async function(req, res){
    // const result = await api.podcastsTrending(max=20, lang='en')
    // return res.json(result.feeds)
    const result = await api.categoriesList()
    return res.json(result)
})

app.use("/users", userRoute);


module.exports = app;