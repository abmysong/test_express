const router = global.express.Router();
const jwtAuth = require('../middlewares/jwtAuth.js');
const db = global.db;

router.get('/', function(req, res) {
  res.send('456');
});

router.post('/join', function(req, res) {
  const sql = `
    insert into test_members(id, password) values(?, password(?))
  `;
  db.query(sql, [req.body.id, req.body.password], function(error, rows) {
    if (!error || db.error(req, res, error)) {
      console.log('Done members join', rows);
      res.status(200).send({
        result: 'Joined'
      });
    }
  });
});

router.post('/login', function(req, res) {
  const sql = `
    select member_pk, id from test_members
    where id = ? and password = password(?)
  `;
  db.query(sql, [req.body.id, req.body.password], function(error, rows) {
    if (!error || db.error(req, res, error)) {
      if (rows.length === 0) {
        res.status(403).send({
          message: 'ID 또는 Password가 틀립니다.'
        });
      } else {
        const member = {
          member_pk: rows[0].member_pk,
          id: rows[0].id
        }
        jwtAuth.tokenCreate(req, res, member)
      }
    }
  });
});

router.get('/login', jwtAuth.tokenCheck, function(req, res) {
  res.status(200).send({
    decoded: req.decoded
  });
});

module.exports = router;