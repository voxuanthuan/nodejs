const express = require('express');
const app = express();
var bodyParser = require('body-parser')
const shortid = require('shortid')
var cookieParser = require('cookie-parser')
var userRoute = require('./routers/user.route');
const authRoute = require('./routers/auth.route');
var db = require('./db');
const authMiddleware = require('./middlewares/auth.middleware');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));
app.use(cookieParser())

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', {
    name: 'XXX'
  })
})

app.get('/styles/custom', (req, res) => {
  res.send('abc');
})

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);


app.listen(3000, () => {
  console.log(`App listening on port 3000`);
})