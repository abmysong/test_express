const router = global.express.Router();
const jwtAuth = require('../middlewares/jwtAuth.js');
const db = global.db;

router.post('/', jwtAuth.tokenCheck, function(req, res) {
  const sql = `
    insert into test_boards (
      member_pk, title, content, create_at
    ) values (
      ?, ?, ?, now()
    );
  `;
  db.query(sql, [req.decoded.member_pk, req.body.title, req.body.content], function(error, rows) {
    if (!error || db.error(req, res, error)) {
      console.log('Done boards created', rows);
      res.status(200).send({
        result: 'Created'
      });
    }
  });
});

router.get('/', function(req, res) {
  const sql = `
    select b.*, m.id from test_boards b inner join test_members m on b.member_pk = m.member_pk;
  `;
  db.query(sql, [], function(error, rows) {
    if (!error || db.error(req, res, error)) {
      console.log('Done boards read', rows);
      res.status(200).send({
        result: 'Read',
        boards: rows
      });
    }
  });
});

module.exports = router;