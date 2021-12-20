const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const sendMail = require('./contactMail');

const { check, validationResult } = require('express-validator');

const app = express();
const port = process.env.PORT || 3000

// handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// body-parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(express.static(__dirname+'/public'));


//form-post
app.post('/contact-us/send',
    check('name', 'השם חייב להיות ארוך משלושה תוים')
        .exists()
        .isLength({min:3}),
    check('number', 'מספר טלפון לא חוקי')
        .isLength({min:10})
        .isNumeric(),
         (req,res)=>{
    const { name, number, message, subject } = req.body;
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const alert = errors.array()
        res.render('home',{alert:alert});
        console.log(alert);
    }
    else{
        sendMail(number , name, subject, message, function(err, data){
        if(err){
            console.log(err);
        }      
    });
    res.render('thankU')
    
}
})


//Routes
app.get('/', function (req, res) {
    res.render('home');
});


app.get('/catalog', function (req, res) {
    res.render('catalog');
});

// 
app.get('/catalog/salads', function (req, res) {
    res.render('salads');
});

app.get('/catalog/sauces', function (req, res) {
    res.render('sauces');
});

app.get('/catalog/vegetables', function (req, res) {
    res.render('vegetables');
});


app.listen(port);