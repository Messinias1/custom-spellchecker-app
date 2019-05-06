const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const NewWord = require('../models/newword.js');

router.get('/', (req, res, next) => {
    NewWord.find()
    .exec()
    .then(docs => {
      console.log(docs);
      //   if (docs.length >= 0) {
      res.status(200).json(docs);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post('/', (req, res, next) => {
    const newword = new NewWord({
        _id: new mongoose.Types.ObjectId(),
        word: req.body.word,
        amount: req.body.amount
    });
    newword
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "Handling POST requests to /newwords",
            createdWord: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });

});

router.get("/:newwordsId", (req, res, next) => {
    const id = req.params.newwordsId;
    NewWord.findById(id)
    .exec()
    .then(doc => {
        console.log("From database", doc);
        // if (doc) {
        //     res.status(200).json(doc);
        //   } else {
        //     res
        //       .status(404)
        //       .json({ message: "No valid entry found for provided ID" });
        //   }
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
})

router.patch("/:newwordId", (req, res, next) => {
    const id = req.params.newwordId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    NewWord.update({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

  router.delete("/:newwordId", (req, res, next) => {
    const id = req.params.newwordId;
    NewWord.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

module.exports = router;