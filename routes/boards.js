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
      console.log('Done members join', rows);
      res.status(200).send({
        result: 'Created'
      });
    }
  });
});

module.exports = router;