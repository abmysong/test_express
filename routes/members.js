const router = global.express.Router();

router.get('/', function(req, res) {
  res.send('456');
});

module.exports = router;