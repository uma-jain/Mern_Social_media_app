if(process.env.NODE_ENV !== 'production'){
   require("dotenv").config()
}
const express=require("express");
const mongoose=require("mongoose");
const bodyparser=require("body-parser");


const userRoutes=require("./routes/userRoutes");
const authRoutes=require("./routes/authRoutes")
const postRoutes=require("./routes/postRoutes")

//database
mongoose.connect(process.env.MONGOURI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on("connected",()=>{
    console.log("connected");
});

const app=express();
const PORT =process.env.PORT || 5000;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use('/uploads',express.static(__dirname +'uploads'))


app.use('/api/posts',postRoutes);
app.use('/users', userRoutes)
app.use('/auth', authRoutes)
if(process.env.NODE_ENV == 'production'){
	//express will serve up production assets
	//like our main.js file, or main.css file
   app.use(express.static('client/build'));
   	//Express will seerve up index.html file
	//if it doesnt recognize route
   const path=require("path");
   app.get("*",(req,res)=>{
	   res.sendFile(path.resolve(__dirname,'client','build','index.html'));
   })

} 

if(process.env.NODE_ENV == 'production'){
	//express will serve up production assets
	//like our main.js file, or main.css file
   app.use(express.static('client/build'));
   	//Express will seerve up index.html file
	//if it doesnt recognize route
   const path=require("path");
   app.get("*",(req,res)=>{
	   res.sendFile(path.resolve(__dirname,'client','build','index.html'));
   })

} 

  //setting port
app.listen(PORT,function(){console.log("server started at port 5000");})