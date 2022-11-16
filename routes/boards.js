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

router.get('/:board_pk', function(req, res) {
  const board_pk = req.params.board_pk;
  const sql = `
    select b.*, m.id from test_boards b inner join test_members m on b.member_pk = m.member_pk
    where board_pk = ?;
  `;
  db.query(sql, [board_pk], function(error, rows) {
    if (!error || db.error(req, res, error)) {
      console.log('Done boards detail', rows);
      res.status(200).send({
        result: 'Read',
        board: rows[0]
      });
    }
  });
});

router.delete('/:board_pk', function(req, res) {
  const board_pk = req.params.board_pk;
  const sql = `
    delete from test_boards
    where board_pk = ?;
  `;
  db.query(sql, [board_pk], function(error, rows) {
    if (!error || db.error(req, res, error)) {
      console.log('Done boards delete', rows);
      res.status(200).send({
        result: 'Deleted'
      });
    }
  });
});

router.put('/:board_pk', function(req, res) {
  const board_pk = req.params.board_pk;
  const sql = `
    update test_boards
    set title = ?, content = ?
    where board_pk = ?;
  `;
  db.query(sql, [req.body.title, req.body.content, board_pk], function(error, rows) {
    if (!error || db.error(req, res, error)) {
      console.log('Done boards update', rows);
      res.status(200).send({
        result: 'Updated'
      });
    }
  });
});

module.exports = router;