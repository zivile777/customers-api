var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  technician: String,
  order_date: String,
  appt_type: String,
  phone: String,
  email: String,
  order_state: String,
});

module.exports = mongoose.model('User', UserSchema);
