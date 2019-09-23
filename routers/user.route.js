var express = require('express');
var router = express.Router();


const controller = require('../controllers/user.controller');

router.get('/', controller.index);

router.get('/search', controller.getSearch);

router.get('/create', controller.getCreate);

router.post('/create', controller.postCreate);

router.get('/:id', controller.getView);

module.exports = router;