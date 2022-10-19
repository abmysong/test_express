const jwt = require('jsonwebtoken');
const privateKey = 'privateKey';
// privateKey를 바탕으로 JWT가 암호환된 토큰을 생성한다.

const tokenCreate = function(req, res, member) {
  jwt.sign(member, privateKey, {
    expiresIn: '1d',
    subject: 'login'
  }, function (error, token) {
    if (error) return res.status(403).send({
      message: error.message
    });
    res.status(200).send({
      token: token
    });
  });
}

const tokenCheck = function (req, res, next) {
  const token = req.headers['x-jwt-token'];
  if (!token) return res.status(403).send({
    message: 'You need to login first'
  });
  jwt.verify(token, privateKey, function (error, decoded) {
    if (error) return res.status(403).send({
      message: error.message
    });
    req.decoded = decoded;
    next();
  });
};

module.exports = {
  tokenCreate: tokenCreate,
  tokenCheck: tokenCheck
};