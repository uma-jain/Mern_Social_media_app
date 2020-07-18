import React, { Component } from 'react'
import CreatePost from "./Posts/CreatePost"
import PostFeed from "./Posts/PostFeed"
import Navbar from "./Navbar/Navbar"
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'
import * as actions from "../../actions/OauthActions";
export class Homepage extends Component {
   
    render() {
     
         if(!this.props.auth.isAuthenticated){
         return <Redirect to='/login'></Redirect>
         }
         if(!this.props.auth.user){
           return <div>Loading</div>
         }
        return(  <div style={{margin:0,padding:0}}>
         <Navbar history={this.props.history}></Navbar>
          <CreatePost></CreatePost>
          <PostFeed></PostFeed>
         </div>)
        
    }
}
function mapStateToProps ({auth}){
    return {auth: auth}
  };

export default connect(mapStateToProps,actions)(Homepage)
