const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


let app = express();
var port = process.env.PORT || 3000

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', () => {
    return (new Date()).getFullYear();
})
app.use((req, res, next) => {
    let data = `${(new Date()).toString()} : ${req.method} : ${req.ips}`;
    fs.appendFile('append.log',  data + '\n' ,(err) => {
        console.log(err);
    })
    next();
})


app.get('/', (request, response) => {
   response.render('home.hbs', {
       pageTitle: 'Home Page',
       where: 'home'
   })
});

app.get('/about', (request, response) => {
   response.render('about.hbs', {
       pageTitle: 'About Page'
   }) 
});

app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});

