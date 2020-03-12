var express = require('express');
var app = express();
let gz = require('./functions.js')

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

// set the home page route
app.get('/', function(req, res) {

    res.send('This is the api index.\nTo call the api you have to use /api.');
});

app.post('/api', async function(req, res) {
    switch (req.body.action) {
        case 'recipesFromIngredient':
            if (!req.body.ingredient) {
                res.status(400)
                res.send({'error': 'missing parameter', 'message': 'You must specify the ingredient you want to search for.'})
            } else {
                let result = await gz.recipesFromIngredient(req.body.ingredient)
                res.send(result);
            }            
            break;
        
        case 'recipeFromUrl':
            if (!req.body.url) {
                res.status(400)
                res.send({'error': 'missing parameter', 'message': 'You must specify the url of the recipe.'})
            } else {
                let result = await gz.recipeFromUrl(req.body.url)
                res.send(result);
            }            
            break;
    
        default:
            res.status(400)
            res.send({'error': 'missing parameter', 'message': 'You must specify the action you want to perform.'})
            break;
    }   
});

app.listen(port, function() {
    console.log('The app is running on http://localhost:' + port);
});