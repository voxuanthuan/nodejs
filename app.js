const express = require('express');
const app = express();
var bodyParser = require('body-parser')
const shortid = require('shortid')

var userRoute = require('./routers/user.route');
var db = require('./db');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', {
    name: 'XXX'
  })
})

app.get('/styles/custom', (req, res) => {
  res.send('abc');
})

app.use('/users', userRoute);


app.listen(3000, () => {
  console.log(`App listening on port 3000`);
})