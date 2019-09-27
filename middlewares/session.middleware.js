const shortid = require('shortid');
const db = require('../db');

module.exports = function (req, res, next) {
  if (!req.signedCookies.sessionId) {
    const sessionId = shortid.generate();
    res.cookie('sessionId', sessionId, { signed: true });
    db.get('sessions').push({
      id: sessionId
    }).write();
  }

  next();
}
