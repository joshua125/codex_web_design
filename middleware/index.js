// all the middleware goes here
var CampGround = require("../models/campgrounds"),
    Comment    = require("../models/comments");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnerShip = function(req, res, next){

    if(req.isAuthenticated()){ //check if user logged in
            CampGround.findById(req.params.id, function(err, foundCampground){ //grab current id from DB
        if(err){
            req.flash("error", "campground not found");
            res.redirect("back")
                
            }else{
                //does user own campground?
            if(foundCampground.author.id.equals(req.user._id)){ //check if use that is attempting to edit campground is the author
                next(); //move onto next code to be implemented ONLY after middleware checks ownership
            }else{
                req.flash("error", "You Dont Have Permission To Do That!")
                res.redirect("back");
            }                                                        /////TODO DESC not updating..fix
        }
        
    });
        
    }else{
        req.flash("error", "You Need To Be Logged In To Do That!")
        res.redirect("back");
    }
}


middlewareObj.checkCommentOwnerShip = function(req, res, next){

    if(req.isAuthenticated()){ //check if user logged in
            Comment.findById(req.params.comment_id, function(err, foundComment){ //grab current id from DB
        if(err){
            res.redirect("back")
                
            }else{
                //does user own comment?
            if(foundComment.author.id.equals(req.user._id)){ //check if use that is attempting to edit comment the author
                next(); //move onto next code to be implemented ONLY after middleware checks ownership
            }else{
                req.flash("error", "You Do Not Have Permission To Do That!")
                res.redirect("back");
            }                                                        /////TODO DESC not updating..fix
        }
        
    });
        
    }else{
        req.flash("error", "You Need To Be Logged In To Do That");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if( req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You Need To Be Logged In To Do That!")
    res.redirect("/login");
}

    


module.exports = middlewareObj;