import React, { Component } from 'react'
import DisplayPost from "./DisplayPost"
import { connect } from 'react-redux';
import * as actions from "../../../actions/PostActions"
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  divi:{
    width:'90%',margin:'auto',
    [theme.breakpoints.down(700)]:{
      width: '100%',
      margin:0,
      padding:0,
      marginTop:30,
      marginBottom:30
    },
  }
})

export class PostFeed extends Component {


  
 componentDidMount(){
    this.props.getPosts();
  }
  

    render() {
       const {posts:{posts,loading},user,isprofilepage,isUserProfile,retrievedUserId,classes} =this.props
       
       if(loading  || posts === null)
       {    return <CircularProgress />  }  
      
      
       return (
            <div className={classes.divi}>
            
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

export default withStyles(styles)(connect(mapStateToProps,actions)(PostFeed))