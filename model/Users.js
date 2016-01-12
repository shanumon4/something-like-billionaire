var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
    Id: { type: Number },
    Username: { type: String },
    Password: String
});

var User = mongoose.model('Users', usersSchema);
module.exports = User;