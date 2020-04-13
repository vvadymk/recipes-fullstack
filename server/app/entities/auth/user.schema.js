const mongoose = require('mongoose');

const User = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    //recipes: [{type: mongoose.Types.ObjectId, ref: "Recipe"}]
}, {
    versionKey: false
});

module.exports = mongoose.model('User', User);
