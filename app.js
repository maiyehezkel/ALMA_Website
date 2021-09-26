const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const sendMail = require('./contactMail');

const app = express();

// handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Routes
app.get('/', function (req, res) {
    res.render('home');
});

app.get('/contect-us', function (req, res) {
    res.render('contectUs');
});
//form-post
app.post('/sent', (req,res)=>{
    const { name, number, email, message, subject } = req.body;
    console.log(req.body);
    sendMail(number , name, subject, email,message, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            console.log('EMAIL SENT!');
        }
    });
});

app.get('/catalog', function (req, res) {
    res.render('catalog');
});

app.get('/about', function (req, res) {
    res.render('about');
});
// 
app.get('/catalog/salads', function (req, res) {
    res.render('salads');
});

app.get('/catalog/cheeses', function (req, res) {
    res.render('cheeses');
});

app.get('/catalog/sauces', function (req, res) {
    res.render('sauces');
});

app.get('/catalog/fish', function (req, res) {
    res.render('fish');
});

app.get('/catalog/vegetables', function (req, res) {
    res.render('vegetables');
});

app.get('/catalog/meats', function (req, res) {
    res.render('meats');
});


app.listen(3000);