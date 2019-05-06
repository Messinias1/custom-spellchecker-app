const mongoose = require('mongoose');

const newWordSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    word: String,
    amount: Number
});

module.exports = mongoose.model('NewWord', newWordSchema);