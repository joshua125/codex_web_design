var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    seedDB      = require("./seeds"),
    Comment     = require("./models/comments"),
    CampGround  = require("./models/campgrounds"),
    methodOverride = require("method-override"),
    User        = require("./models/user"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    localStrategy = require("passport-local");
    
var commentsRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes       = require("./routes/index")
    
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"))
app.use(flash());
seedDB();

////////////////////// PASSPORT CONFIGURATION \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.use(require("express-session")({
    secret : "where were you during The Burning of Teldrassil? ",
    resave : false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middle ware to pass currentUser tp every route
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//requiring routes
app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentsRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp Camp Server engaged....")
});


// CampGround.create({
//     name: "Granite Hill",
//     image: "https://cdn.pixabay.com/photo/2012/08/06/00/53/bridge-53769__480.jpg"
// },    function(err, campground){
//         if(err){
//             console.log("Error occurred Inserting " + err + campground.name);
//         }else {
//             console.log("new created campground"  + campground);
//         }
// });