var mongoose =  require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username : String,
    password : String
});

//add passport-mongoose-local methods to our user. Eliminates boiler plater when inserting users into db and auth
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Users", userSchema);