var mongoose = require("mongoose")


//SCHEMA SETUP
let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        },
        username: String
    },
    comments: [ { type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"} ]
});

let CampGround = mongoose.model("CampGround", campgroundSchema);

module.exports = mongoose.model("Campground", campgroundSchema);