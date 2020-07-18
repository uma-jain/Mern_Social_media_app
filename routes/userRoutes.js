const express=require("express");
const Router = express.Router()
const User=require("../model/user")
const isLoggedIn=require("../middlewares/loggedin")
const Profile=require('../model/profile')
const Post = require('../model/post');
//---------------------------ALL USERS

Router.get("/get_all_users",isLoggedIn,(req,res)=>{
 
 User.find({}).select('-email -password -createdat').lean().exec(function(err,result){
    if(err){console.log(err)}
    else{
      
     const filteredArray=result.filter(user=> user._id.toString() !== req.user.id)
      res.json(filteredArray)  
    }
})

})
// --------------- get and delete user by userid---------------------------------------------------
//users/user/userid

Router.route("/user/:userId")
.get(isLoggedIn,(req,res)=>{
  
  User.findById(req.params.userId).select('-password -email').lean().exec(function(err,result){
     
    if(err){console.log(err)}
    else{  
      try {
        Post.find({author:req.params.userId}).lean().exec((err,post)=>{
             res.send(result)
        })
      } catch (error) {
        console.error({error})
        res.status(500).send('Internal Server Error')
      }    
      
    }
})
})
.delete(isLoggedIn,(req,res)=>{
  User.remove({ _id: req.params.id })
  .exec()
  .then((result) => {
    res.status(200).json({ message: 'Successfully deleted user' });
  })
  .catch((err) => {
    res.status(500).json({ message:err });
  });

})


//------------current user profile
Router.get( '/currentuserprofile',isLoggedIn,async(req, res) => {
 
  try {
    const profile=await Profile.findOne({user:req.user.id}).populate('user',['name','profileUrl']);
      res.json(profile);
      } catch (error) {
     console.error({error})
      res.status(500).send('Internal Server Error')
  }
}
);
// create or edit profile

Router.post( '/editprofile',isLoggedIn,async(req, res) => {
     
     const 
     {name,
      website, bio,twitter,instagram,facebook,profilePictureUrl }=req.body;
      
      const profileFields={};
      profileFields.user=req.user.id;
      if(website) profileFields.website=website;
      if(bio) profileFields.bio=bio;
           
       profileFields.social ={};
      if(twitter) profileFields.social.twitter=twitter;
      if(instagram) profileFields.social.instagram=instagram;
      if(facebook) profileFields.social.facebook=facebook;
  
      const  usertoupdate={}
      if(name) usertoupdate.name=name
      if(profilePictureUrl) usertoupdate.profileUrl=profilePictureUrl
      try {
       
        let profile=await Profile.findOne({user:req.user.id})
          if(profile){
            profile=await Profile.findOne({user:req.user.id}).populate('user',['name'])
            profile= await Profile.findOneAndUpdate({user:req.user.id},{$set:profileFields},{new :true})
            await  User.findByIdAndUpdate(req.user.id,{$set:usertoupdate},{new :true})
           }
           else{
         profile=new Profile(profileFields);
         await profile.save();}
        
         res.json(profile);  
 
 
        }     
       catch (error) {
        console.log(error);
         res.status(500).send("Internal Server Error");
      }
 
   }
 );
 // following i am following id wala user
 Router.patch('/follow/:id',isLoggedIn,async(req,res)=>{
  let user=await User.findById(req.user.id);
  

  try {
           
          if(user.following.filter(user=>user.toString() === req.params.id).length > 0){
            
            console.log('if true') 
            try {
                   user=await User.findByIdAndUpdate(req.user.id,{
                   $pull:{following:req.params.id}
                    },{new:true});
                // add to follower list 
                await User.findByIdAndUpdate(req.params.id,{
                      $pull:{followers:req.user.id}
                       },{new:true});
                       
                    return res.send(user);
              } catch (error) {
                    res.status(404).json({ success: false });
              }  
            
          }
          else{
            try {
                  console.log('else true') 
                  user=await User.findByIdAndUpdate(req.user.id,
                    { $push:{following:req.params.id}},{new:true});
                  await User.findByIdAndUpdate(req.params.id,
                      { $push:{followers:req.user.id}},{new:true});
                  return res.send(user);
            } catch (error) {
              console.log(error)
                res.status(404).json({ success: false });
            } 
          }
         
      
  } catch (error) {
    return res.status(500).json(err);
  }
})
 

 // if somebosd follows my add that userin my followers list 
 

  module.exports=Router;