const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const isLoggedIn=require("../middlewares/loggedin");


// Load User model
const User = require('../model/user');

// @route   GET auth/register
// @desc    Register user
// @access  Public

router.post('/register', [
 check('name',"Name is required").not().isEmpty(),
 check('email','Plese include a valid email').isEmail(),
 check('password',"Please enter a password with 6 or more characters").isLength({min:6})

],async(req, res) => {
 
    // Check Validations
    const errors=validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors:errors.array()});
  }
try{
   let user=await User.findOne({ email: req.body.email })
       if (user) {
      
      return res.status(400).json({errors:[{msg:'User already exists'}]});
    } else {
      
          // create instance of user
      user = new User({
        name: req.body.name,
        email: req.body.email,
         password: req.body.password
      });
      //encrypt
      const saltrounds=await bcrypt.genSalt(10);
      
      user.password=await bcrypt.hash(req.body.password,saltrounds)  ;
     //save
      await user.save(); 
      const payload = { id: user.id }; // Create JWT Payload

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 36000 },
        (err, token) => {
          if(err )throw err;
          res.json({token});
        }
      );
     
      
    }         
}catch(err){
  console.log(err)
   res.status(500).send("internal server error")
}
});
     
// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', [
  check('email','Plese include a valid email').isEmail(),
  check('password',"Please enter a password ").exists()
 
 ],(req, res) => {
   //check validation
  const errors=validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors:errors.array()});
  }

  
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      
      return res.status(404).json({errors:[{msg:'User Doesnt Exist!'}]});
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
         process.env.JWT_SECRET,
          { expiresIn: 36000 },
          (err, token) => {
            if(err )throw err;
            res.json({token});
          }
        );
      } else {
        return res.status(404).json({errors:[{msg:"Invalid Credentials"}]});
   
      }
    });
  });
});

// @route   GET auth/current
// @desc    Return current user
// @access  Private
router.get('/current',isLoggedIn,async(req,res)=>{
  try {
    const user=await User.findById(req.user.id).select('-password')
    res.json(user);
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error");
  }
 

  }
);

module.exports = router;
