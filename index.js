//Stock Market App Portfolio
const express = require('express');
const app = express();
const path = require('path');
const { engine } = require("express-handlebars");
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;

//use body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));


//API KEY = pk_a7a5bdb3dc944429b36b33fb561c3e7d
//Create a call api function
function call_api(finishedAPI, ticker) {

    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_a7a5bdb3dc944429b36b33fb561c3e7d', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        if (res.statusCode === 200) {
            // console.log(body);
            finishedAPI(body);
        }
    });
}

//Set Handlebars Middleware

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

const otherstuff = "Hello There is another stuff..."

//Set handlebar index GET routes
app.get('/', function(req, res) {
    call_api(function(doneAPI) {
        res.render('home', {
            stock: doneAPI
        });
    }, "fb");
});

//Set handlebar index POST routes
app.post('/', function(req, res) {
    call_api(function(doneAPI) {
        // posted_stock = req.body.stock_ticker;
        res.render('home', {
            stock: doneAPI,
        });
    }, req.body.stock_ticker);
});

//Create about page route
app.get('/about.html', function(req, res) {
    res.render('about');
});

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server Listening on port' + PORT));