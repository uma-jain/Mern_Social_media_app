
const passport=require("passport");
const LocalStrategy=require("passport-local").Strategy;
const User=require("../model/user")

const bcrypt=require("bcrypt")
const saltRounds = 10;
const findOrCreate=require("mongoose-findorcreate");-


passport.serializeUser(function(user, done){
 console.log("serialize user",user)
  done(null, { _id: user._id });
});

passport.deserializeUser( function(id, done){
 console.log("deserialize user")
    User.findOne({ _id: id },(err, user) => {
//console.log('*** Deserialize user, user:',user)
done(null, user)
}
)
});



//LOCAL SIGNUP
passport.use('local-signup',new LocalStrategy({passReqToCallback: true },function(req,username,password,done){
console.log("from local signup strategy",req.body)    
      User.findOne({'email' :  username}).lean().exec((err,user)=>{
         if(err){return done(err,null);}
         if(user){return done('Email is already in use',false);}
         console.log(password,req.body.passwordConfirm)
         if(password !== req.body.passwordConfirm){
          return done('Password and Confirm Password doesnt match',false)
         }else{

          bcrypt.hash(password ,saltRounds, function(err, hash){
            // Store hash in your password DB
                  var newUser = new User();
                  newUser.email = username;
                  newUser.password = hash;
                  newUser.passwordConfirm= hash
                  newUser.name=req.body.name;
                  newUser.save().
                  then((newUser)=>{
                      if(err){return done(err,null); }
                    console.log(newUser);
                    return done(null, newUser);
                  });
            });
          }
         });
    
}));

//LOCAL SIGNIN
passport.use("local-signin",new LocalStrategy({passReqToCallback: true},async function(req,username,password,done){
     console.log("local signin",req.body)
      await User.findOne({'email':username}).lean().exec((err,user)=>{
         if(err){ return done(err,null);}
        
         if(!user){return done("Invalid credentials",null);  }
        
         bcrypt.compare(password,user.password, function(err, result) {
          
              if(err){return done(err,null); }
              if( result === true){ 
               // console.log("in localsignin result true",user)
                return done(null,user); }
              else{ 
                
                return done("wrong password",false);}
          });
            });
      

}));

