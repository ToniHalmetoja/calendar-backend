var express = require('express');
var router = express.Router();
const mongodb = require("mongodb");

router.post('/readall', function(req, res) {
  req.app.locals.db.collection("events").find().toArray()
  .then(results => { 
    res.send(results);
  })
});

router.post('/readone', function(req, res) {
  console.log(req.body.id)
  req.app.locals.db.collection("events").find({"date":req.body.id}).toArray()
  .then(results => { 
    res.send(results);
  })
});

router.post('/write', function(req, res) {
  req.app.locals.db.collection("events").insertOne({"date": req.body.date, "note":req.body.note})
  .then(
    res.send(JSON.stringify("Update ok"))
  )
});

router.post('/delete', function(req, res) {
  req.app.locals.db.collection("events").deleteOne({_id: new mongodb.ObjectId(req.body.id)})
  .then(
    res.send(JSON.stringify("Update ok"))
  )
});

router.post('/holidays', function(req, res) {
  console.log(req.body.month)
  fetch("http://sholiday.faboul.se/dagar/v2.1/" + month, {method: "GET",
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
  })
  .then(results => { 
    console.log(results);
    res.send(results);
  })

});


module.exports = router;
