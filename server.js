const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine', 'hbs');

//middleware ->allows to add on to existing functionality of express
app.use((req, res, next) => {
    // middleware that logs some request data to screen
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) =>{
        if(err){
            console.log("Unable to append to server.log.");
        }
    });
    next();
});
// middleware that renders maintenance template
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

// middleware that shows static help.html page
app.use(express.static(__dirname + "/public"));

// Handlebars helpers
hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) =>{
    return text.toUpperCase();
});

//register handlers
app.get('/', (request, response)=>{
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMsg: 'Welcome to my website'
    });
});

app.get('/about', (request, response)=>{
    response.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (request, response)=>{
    response.send({
        errorMsg: 'Unable to handle request'
    });
});

app.listen(port, ()=>{
    console.log(`server is up on port ${port}`);
});