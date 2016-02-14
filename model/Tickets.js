var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ticketsSchema = new Schema({
    Id: { type: Number, ref: 'Id' },
    FourDNumber: { type: String },
    Sub1: String,
    Sub2: String,
    Company: Array,
    PhoneNumber: String,
    IsIBox: Boolean,
    SMSStatus: Number,
    ContestDate: { type: Date },
    CreatedOn: { type: Date },
    CreatedBy: String,
    ModifiedOn: { type: Date },
    ModifiedBy: String,
    IsDeleted: Number
});

var Tickets = mongoose.model('Tickets', ticketsSchema);
module.exports = Tickets;