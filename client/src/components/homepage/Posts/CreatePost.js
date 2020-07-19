import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from "../../../actions/PostActions"

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import CircularProgress from '@material-ui/core/CircularProgress';
import { storage } from "../../../firebase/firebase"


const styles = theme => ({
    container: {
      padding:"50px 0px  20px",
       float:'left',
       [theme.breakpoints.down(900)]:{
         margin:'auto',
         justifyContent: 'center',
          alignContent:'center',
            },
       
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
    [theme.breakpoints.down(500)]:{
            margin:'auto',
            marginLeft:'20px'
          },
    
  },
  
  input:{
    display: 'none',
  },
  button:{
    padding:10,
    marginLeft:20,
    
    
  },
  divi:{
    margin:'auto',
    display:'flex',
          justifyContent: 'center',
          alignContent:'center',
          [theme.breakpoints.down(900)]:{
            display: 'table',
            margin:' auto',
           
            
          },
   
  }
  
});


export class CreatePost extends Component {
      constructor() {
         super();
          this.state={
            postText:null,
            filepreview:null,
             postImage:null,
             setcancelbutton:false,
             postImageUploadedspinner:false
          }
      }
      handleChange=(event)=>{
        this.setState({setcancelbutton:true})
       this.setState({[event.target.name]:event.target.value})
      }  
      
      handleSubmit  = (e) => {
        
        e.preventDefault()
        this.setState({postImageUploadedspinner:true})
        //console.log(this.state.postImageUploaded)
        //console.log(this.state.postImage)
        // now async code goes here
        if(this.state.postImage)
       { const uploadTask = storage.ref(`/mernsocialmedia/posts/${this.state.postImage.name}`).put(this.state.postImage)
        uploadTask.on('state_changed', 
      (snapShot) => {
        //takes a snap shot of the process as it is happening
       // console.log(snapShot)
      }, (err) => {
        //catches the errors
        console.log(err)
      }, () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
         
        storage.ref('mernsocialmedia/posts').child(this.state.postImage.name).getDownloadURL()
         .then(fireBaseUrl => {
          // console.log("url is ",fireBaseUrl);  
          this.setState({postImage:fireBaseUrl})
         //  console.log("calling create post")
          this.props.createPost(this.state.postText,this.state.postImage);
          this.setState({postImageUploadedspinner:false,filepreview:null,postText:null,setcancelbutton:false,postImage:null}) 
        })
      })}else{
        
        this.props.createPost(this.state.postText,null);
        this.setState({postImageUploadedspinner:false,filepreview:null,postText:null,setcancelbutton:false}) 
      }
      
     

      }
      render() {
        const { classes } = this.props;
        if(this.state.postImageUploadedspinner){
                return <CircularProgress />}

        return (
          <div className={classes.divi}>
          <form
            className={classes
            .container}
            noValidate
            autoComplete="off"
           
          >
          <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
           type="file"
            onChange={(event)=>{
               this.setState({setcancelbutton:true})
                this.setState({
                 filepreview: URL.createObjectURL(event.target.files[0]),
                 postImage:event.target.files[0]
                  })
             }}
           />
          <label htmlFor="contained-button-file">
          <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
          {
            this.state.filepreview && <img style={{width:300,height:300,padding:'0 20px'}} src={this.state.filepreview}/>
          }
                 
            <TextField
              id="textarea"
              placeholder="What's on your mind?"
              multiline
              className={classes.textField}
              margin="normal"
              rowsMax="5"
              name="postText"
              value={this.state.postText}
              onChange={this.handleChange}
            />             
                
          </form>
          <div style={{marginTop:50,padding:'50px 0p 20px'}}>
          <Button
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit"
              onClick={this.handleSubmit}
            >
              Post
            </Button>  
           { this.state.setcancelbutton&&
              <Button
              style={{backgroundColor:'green',margin:'0px 5px'}}
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={(e)=>{
                this.setState(
                  {filepreview:null,setcancelbutton:false,postImage:null,postText:''})
              }}
            >
              Cancel
            </Button>} 
            </div>
            </div>
        );
      }
}

export default withStyles(styles)(connect(null,actions)(CreatePost));
