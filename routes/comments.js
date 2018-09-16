var express = require("express");
var router = express.Router();

var CampGround = require("../models/campgrounds"),
    middleware = require("../middleware"),
    Comment    = require("../models/comments");
//===========================\\
// COMMENTS COMMENTS ROUTES  \\
//===========================\\


router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req, res) {
   CampGround.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err)
       }else{
           res.render("comments/new", {campground: campground})
       }
   })
}); 

router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req, res){
    //look up campground using id
    CampGround.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Could not create Comment");
                    console.log(err)
                }else{
                    //add username and id to comment 
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username
                    //save comment
                    comment.save();
                    console.log(comment);
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Comment Created");
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
    //create new commet
    //connect new comment to campground
    
})

router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnerShip, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err){
            res.redirect("back")
        }else{
          res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
          console.log("the comment is:::::" + foundComment._id);
        }
    })
})

//comments edit route



//comments update

router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnerShip, function(req, res){
    /* Here it's important to remember that we're using our routes as variables which point to the current resource  that we're working on
     * so here , we grab the comment id in our route via [req.params.comment_id], which is the same as the comment id in our database
     * we the take that resource id and query the database and update it with the value passed from our edit.ejs page i.e req.body.comment
    */
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){ 
        if(err){
            res.redirect("back")
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

//////////////////////COMMENT DESTROY ROUTE\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnerShip, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back")
        }else{
            req.flash("succes", "successfully removed");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})


// function isLoggedIn(req, res , next){
//     if( req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }

//////////////MIDDLEWARE\\\\\\\\\\\\\\\\\\\\\
// function checkCommentOwnerShip(req, res, next){
//     if(req.isAuthenticated()){ //check if user logged in
//             Comment.findById(req.params.comment_id, function(err, foundComment){ //grab current id from DB
//         if(err){
//             res.redirect("back")
                
//             }else{
//                 //does user own comment?
//             if(foundComment.author.id.equals(req.user._id)){ //check if use that is attempting to edit comment the author
//                 next(); //move onto next code to be implemented ONLY after middleware checks ownership
//             }else{
//                 res.redirect("back");
//             }                                                        /////TODO DESC not updating..fix
//         }
        
//     });
        
//     }else{
//         res.redirect("back");
//     }
// }


module.exports = router;