import React, { Component } from 'react';
import CommetField from './AddCommentField'
import DisplayComment from './DisplayComments'

class Comments extends Component {
  


  render() {
    let {user,comments,postId} = this.props;
    comments=comments.reverse()
    return (
      <div>
    
    <CommetField user={user} postId={postId}></CommetField>
    { comments.length >0 && comments.map((comment)=>{
      return  <DisplayComment user={user} comment={comment} postId={postId}></DisplayComment>
    })}
     

      </div>
    );
  }
}



export default (Comments);