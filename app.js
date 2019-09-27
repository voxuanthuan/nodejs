require('dotenv').config()
const express = require('express');
const app = express();
var multer = require('multer')
var bodyParser = require('body-parser')
const shortid = require('shortid')
var cookieParser = require('cookie-parser')
var userRoute = require('./routers/user.route');
const authRoute = require('./routers/auth.route');
const productRoute = require('./routers/product.route');
var db = require('./db');

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

const authMiddleware = require('./middlewares/auth.middleware');
const sessionMiddleware = require('./middlewares/session.middleware');
var upload = multer({ dest: './public/uploads' });
const cartRoute = require('./routers/cart.route');
const badgeMiddleware = require('./middlewares/badgeCart.middleware');
var apiProductRoute = require('./api/routers/product.route');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);


app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', {
    name: 'XXX'
  })
})

app.get('/styles/custom', (req, res) => {
  res.send('abc');
})
app.use('/users', upload.single('avatar'), authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', badgeMiddleware, productRoute);
app.use('/cart', cartRoute);
app.use('/api/products', apiProductRoute);

app.listen(3000, () => {
  console.log(`App listening on port 3000`);
})