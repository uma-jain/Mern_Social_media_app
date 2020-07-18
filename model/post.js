const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
  text: {
    type: String,
  },
  postimageUrl:{type:String},
  timestamp: {
    type: Date,
    default: Date.now()
  },
 
author: {
    type: Schema.ObjectId,ref:'user'
  },
  likes: [
    { type: Schema.ObjectId,ref:'user'}
  ],
  likesCount:{type:Number,default: 0},
  comments:{
    type:[{
    commenter:{type: Schema.ObjectId,ref:'user'},
    text:String,
    timestamp: {type:Date}
    }]
  }


});

module.exports = mongoose.model('Post', PostSchema);
/*https://medium.com/@650egor/react-30-day-challenge-day-2-image-upload-preview-2d534f8eaaa */