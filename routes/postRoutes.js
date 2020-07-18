const Post = require('../model/post');
const router = require("express").Router();
const isLoggedIn=require('../middlewares/loggedin')
const User=require('../model/user')

const { check, validationResult } = require('express-validator');
// /api/posts
router.get('/:id',isLoggedIn,async (req,res)=>{
  const post =await Post.findById(req.params.id);
  if(post){
    return res.json({data: posts });
  }else{
    return res.status(404).json({errors:[{msg:'no post found'}]});
  }
})
router.get('/', (req, res) => {
    
    Post.find({}).
     populate("author","name profileUrl")
    .populate('comments.commenter',"name profileUrl")
    .exec((err,posts)=>{
      if(err){
        console.log(err);
        res.status(404).json({errors:[{ msg: 'No posts found' }]})
      }
       
        return res.json({ success: true, data: posts.reverse() });
    })
  
    })     
  
  // /api/posts
  //add posts
  router.post('/', isLoggedIn,async (req, res) => {
   
    const user=await User.findById(req.user.id)
    const newPost = new Post({
      text: req.body.text || null,
     author: req.user.id,
     timestamp:new Date().getTime(),
     postimageUrl:req.body.postimageUrl || null,
     comments:[]

    });
    
    return newPost
    .save()
    .then(post => res.json(post))
    .catch(e =>{ 
      res.status(400).send(e)});

  });
//edit posts
  router.patch('/:id', (req, res) => {
    const { id } = req.params;
  
    try {
      return Post.findByIdAndUpdate(
        id,
        { $set: { text: req.body.text} },
        { new: true },
        (err, post) => {
          if (err) return handleError(err);
          return res.send(post);
        }
      );
    } catch (e) {
      return res.status(400).send(e);
    }
  });

  //delete posts
  router.delete('/:id', isLoggedIn,(req, res) => {
    Post.findById(req.params.id)
      .then(post =>
        post.remove().then(() =>
          res.json({
            success: true
          })))
      .catch(err => res.status(404).json({ success: false }));
  });
  
  // /api/like/postid
  // like if notliked else unlike if laready liked counter acions
  router.patch('/like/:id',isLoggedIn,async(req,res)=>{
    let post=await Post.findById(req.params.id);
    console.log(req.params.id)
  
    try {
             
            if(post.likes.filter(likes=>likes.toString() === req.user.id).length > 0){
              
              console.log('if true') 
              try {
                      post=await Post.findByIdAndUpdate(req.params.id,{
                        $inc:{likesCount:-1},
                      $pull:{likes:req.user.id}
                      },{new:true});
                      return res.send(post);
                } catch (error) {
                      res.status(404).json({ success: false });
                }  
              
            }
            else{
              try {
                    console.log('else true') 
                    post=await Post.findByIdAndUpdate(req.params.id,{$inc:{likesCount:1}, $push:{likes:req.user.id}},{new:true});
                    return res.send(post);
              } catch (error) {
                console.log(error)
                  res.status(404).json({ success: false });
              } 
            }
           
        
    } catch (error) {
      console.log(error)
                  res.status(404).json({ success: false });
    }
  })
  //api/posts/comment/postid
  //add comment
  //get - create comment
 
router.post("/comment/:postid",check("text","Can't submit empty comment"),isLoggedIn,async(req,res)=>{
  const errors=validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors:errors});
  }
  try {
     const post=await Post.findByIdAndUpdate(req.params.postid,{
      $addToSet: {
        comments: {
          commenter: req.user.id,
          text: req.body.text,
          timestamp: new Date().getTime()
        }
      }},{new:true})
      
      res.send(post);
  } catch (error) {
                  console.log(error)
                  return res.status(400).send(err);
  }
})

 //api/editcomment/postid
  //edit comment
  //patch - create comment

  router.patch("/comment/:postid/:commentid",isLoggedIn,async(req,res)=>{
    try {
       const post=await Post.findById(req.params.postid);
       const theComment = post.comments.find(comment =>
        comment._id.equals(req.params.commentid));

      if (!theComment) return res.status(404).send('Comment not found');
      theComment.text = req.body.text;
      post.save()
      .then(post => res.json(post))
      .catch(e =>{ 
        console.log(e)
        res.status(400).send(e)});


    } catch (error) {
                    console.log(error)
                    return res.status(400).send(err);
    }
  })

//api/deletecomment/postid
  //edit comment
  //patch - create comment
  router.delete("/comment/:postid/:commentid",isLoggedIn,async(req,res)=>{
    try {
   
        await  Post.findByIdAndUpdate(
            req.params.postid,
            {
              $pull: {
                comments: {
                  _id: req.params.commentid
                }
              }
            },
            { new: true },
            (err, post) => {
             // console.log("err id",err)
              if (err) return res.status(400).send(err);
               return res.send(post);
            }
          );

    } catch (error) {
                    console.log(error)
                    return res.status(400).send(err);
    }
  })









  module.exports = router;