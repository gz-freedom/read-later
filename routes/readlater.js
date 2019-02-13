var express = require('express');
var router = express.Router();

let Read = require('../models/Read');

// add 
router.route('/add').post((req, res) => {
  let article = new Read(req.body);
  article.save().then(article => {
    res.status(200).json({'read': 'Save successfully'});
  }).catch(err => {
    res.status(400).send('Save error');
  });
});

// get
router.route('/get').get((req, res) => {
  Read.find(function (err, list){
    if(err){
      console.log(err);
    }
    else {
      res.json(list);
    }
  }).sort({ 'updated_date': -1 });
})

module.exports = router;