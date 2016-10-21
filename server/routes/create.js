var express = require('express')
  , router = express.Router()
  , debug = require('debug')('m3d-create')
  , gmClient = require('@google/maps').createClient({
                                        key: 'AIzaSyC7Uu6dvnQka6EL0MAiCCr7_6VfynDigm0'
                                      });

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('create')
});

router.post('/', function(req, res, next){
  gmClient.geocode({
    address: '1600 Amphitheatre Parkway, Mountain View, CA'
  }, function(err, response) {
    if (err) {
      debug('Error', err)
    }
    res.send('response', response);
  });
})

module.exports = router;
