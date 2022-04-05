const express = require('express');
const app = express();
const path = require('path');
const { engine } = require("express-handlebars");

const PORT = process.env.PORT || 3000;

//Set Handlebars Middleware

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

const otherstuff = "Hello There is another stuff..."

//Set handlebar routes
app.get('/', function (req,res) {
	res.render('home', {
		stuff: otherstuff
	});
});

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server Listening on port' + PORT));