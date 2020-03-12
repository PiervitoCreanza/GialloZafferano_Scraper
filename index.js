var express = require('express');
var app = express();
import {recipesFromIngredient} from './functions'


// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

// set the home page route
app.get('/', function(req, res) {

    res.send('index');
});

app.get('/ingredient', async function(req, res) {

    let result = await recipesFromIngredient('pomodoro')
    res.send(result);
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});