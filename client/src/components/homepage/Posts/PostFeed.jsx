import React, { Component } from 'react'
import DisplayPost from "./DisplayPost"
import { connect } from 'react-redux';
import * as actions from "../../../actions/PostActions"
import { retrieveUser } from '../../../actions/Useractions';

export class PostFeed extends Component {

 componentDidMount(){
    this.props.getPosts();
  }
  

    render() {
       const {posts:{posts,loading},user,isprofilepage,isUserProfile,retrievedUserId} =this.props
       if(isUserProfile){
       
      }
       if(loading  || posts === null)
       {    return <div>Spinner</div>  }  
      
      
       return (
            <div style={{width:'90%',margin:'auto'}}>
            
          {
            this.props.posts?(
            this.props.posts.posts.map(post =>{
             
            if(
            isprofilepage?( user._id === post.author._id):
            isUserProfile?(post.author._id === retrievedUserId)
            :(user.following.includes(post.author._id) || user._id === post.author._id)
           )
            {
             return   <DisplayPost 
            key={post._id} 
            post={post}
            deletePost={this.props.deletePost}
            updatePost={this.props.updatePost} 
            updatepostlikes={this.props.updatepostlikes}  
             user={user}       
           />           
             }
           }

           )):null
           
           }
            </div>
        )
    }
}

function mapStateToProps({post,auth }) {
  
    return { posts: post,user:auth.user };
  }

export default connect(mapStateToProps,actions)(PostFeed)