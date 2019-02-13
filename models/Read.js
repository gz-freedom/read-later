var mongoose = require('mongoose');

var ReadSchema = new mongoose.Schema({
    title: String,
    description: String,
    url: String,
    tags: Array,
    updated_date: { type: Date, default: Date.now },
    read: { type: Boolean, default: false }
});

module.exports = mongoose.model('Read', ReadSchema);