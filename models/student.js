/**
 * Created by xiefuheng on 15/6/5.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = new Schema({
    id: Number,
    name: String,
    phone: String,
    qq: String,
    wechat: String,
    pay: String,
    email: String,
    city: String,
    enterprise: String
});

module.exports = mongoose.model('Student', StudentSchema);