const mongoose=require("mongoose");
//blueprint schema
const userSchema=new mongoose.Schema({
    name: {
        type: String,
       required:true,
       
      },
      email: {
        type: String,
        required: true,
        
    },
     
    password:{
       type:String,
       required:true
   },
   created: {
    type: Date,
    default: Date.now
  },
  profileUrl:{
    type:String ,default:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ7wrKjpbjvQzLHlQfvKO8gsopOJBvbCEXe1A&usqp=CAU'
  },
  following:[{type:mongoose.Schema.Types.ObjectId,ref:'user'}],
  followers:[{type:mongoose.Schema.Types.ObjectId,ref:'user'}],
  
});


module.exports=mongoose.model("user",userSchema)
