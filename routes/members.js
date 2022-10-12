const router = global.express.Router();
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
module.exports = router;