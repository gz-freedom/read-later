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

// update
router.route('/update/:id').post((req, res) => {
  Read.findById(req.params.id, (err, article) => {
    article.read = req.body.read ? req.body.read : article.read;
    article.title = req.body.title ? req.body.title : article.title;
    article.url = req.body.url ? req.body.url : article.url;
    article.tags = req.body.tags ? req.body.tags : article.tags;

    article.save().then(article => {
      res.json(article);
    }).catch(err => {
      res.status(400).send("unable to update!");
    });
  })
});

// delete
router.route('/delete/:id').get((req, res) => {
  Read.findByIdAndDelete({ _id: req.params.id }, (err, article) => {
    if(err) res.json(err);
    else res.json("deleted!");
  })
});


module.exports = router;