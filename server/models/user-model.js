const mongoose = require('mongoose')
require('mongoose-type-email');

// create a schema
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: mongoose.SchemaTypes.Email, required: false },
    status: { type: String, required: false },
    _id: { type: String, required: true }
});

// create a model with userSchema 
module.exports = mongoose.model('users', userSchema)