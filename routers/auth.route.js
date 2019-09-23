const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');

router.get('/login', controller.getLogin);
router.post('/login', controller.postLogin);

module.exports = router;