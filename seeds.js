var mongoose = require("mongoose");
var CampGround = require("./models/campgrounds");
var Comment = require("./models/comments");

let data = [
    {
    name: "Clouds Rest",
    image: "https://i.imgur.com/nThqZb.jpg",
    desc : "Some info on camp" 
    },
    {
    name: "Desert Mesa",
    image: "https://i.imgur.com/TW7Meeib.jpg",
    desc : "Some info on camp" 
    },
    {
    name: "Forest of Greed",
    image: "https://i.imgur.com/wsBiSSdb.jpg",
    desc : "Some info on camp" 
    }
    ]


//remove all campgrounds
function seedDB(){
CampGround.remove({}, function(err){
    if(err){
        console.log(err)
    }else{
        console.log("DB Purged")
    }
   // add a few campgrounds
data.forEach(function(seed){
    CampGround.create(seed,function(err, campground){
        if(err){
            console.log(err)
        }else{
            console.log("added campground" + campground);
            Comment.create(
                {
                    text: "wish there were internet",
                    author: "Homer"
                 }, function(err, comment){
                     if(err){
                         console.log(err);
                     }else{
                         campground.comments.push(comment)
                         campground.save();
                         console.log("created new comment")
                     }
                 })
        }
      })
    })
  })
 }


module.exports = seedDB;