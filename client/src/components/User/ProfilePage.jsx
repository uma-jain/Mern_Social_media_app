import React, { Component } from 'react';
import { connect } from 'react-redux';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import NavbarContainer from '../homepage/Navbar/Navbar';
import {getcurrentProfile,updateCurentuserprofile} from "../../actions/ProfileActions";
import {Link} from 'react-router-dom'

import * as moment from 'moment';
import Postfeed from "../homepage/Posts/PostFeed";

import Avatar from '@material-ui/core/Avatar';

import { storage } from "../../firebase/firebase";

import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import CircularProgress from '@material-ui/core/CircularProgress';
const styles = theme => ({
  backgroundContainer: {
    alignItems: 'center',
    backgroundImage: `url(https://wallpaperplay.com/walls/full/d/b/3/80973.jpg)`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: 'flex',
    height: '50vh',
    justifyContent: 'center',
    width: '100%'
  },
  editButton: {
    margin: theme.spacing.unit,
    position: 'absolute',
    right: '1vw',
    top: '50vh'
  },
  saveButton: {
    margin: theme.spacing.unit
  },
  formContainer: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  paper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: 140,
    justifyContent: 'center',
    width: '33.3%'
  },
  modalPaper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    top: '50%',
    left: '50%',
    outline: 'none',
    transform: 'translate(-50%, -50%)'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  root: {
    flexGrow: 1
  },
  input: {
    display: 'none',
  },
  avator:{
    width:100,
    height:100
  }
});

class ProfilePage extends Component {
  state = {
    modalOpen: false,
    bio:'',
    website:'',
    twitter:'',
    facebook:'',
     name:'',
     profileimage:'',
     profilepictureupdated:''
  };
  
  componentDidMount = () => {
    const { history,user } = this.props;
    
    if (!user.loading && !user.isAuthenticated) {
      return history.push('/login');
    }
    
   else{
    this.props.getcurrentProfile();
   } 
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(() => ({ [name]: value }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
   
    const {updateCurentuserprofile } = this.props;
    updateCurentuserprofile(this.state);
    this.handleModalClose();
  };

  handleModalOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };
  uploadHandler = (e) => {
    e.preventDefault()
    this.setState({profilepictureupdated:'start'})
    // now async code goes here
    const uploadTask = storage.ref(`/mernsocialmedia/profile/${this.state.image.name}`).put(this.state.image)
    uploadTask.on('state_changed', 
  (snapShot) => {
    //takes a snap shot of the process as it is happening
    console.log(snapShot)
  }, (err) => {
    //catches the errors
    console.log(err)
  }, () => {
    // gets the functions from storage refences the image storage in firebase by the children
    // gets the download url then sets the image from firebase as the value for the imgUrl key:
     
    storage.ref('mernsocialmedia/profile').child(this.state.image.name).getDownloadURL()
     .then(fireBaseUrl => {
      
     // console.log("url is ",fireBaseUrl);      
      this.props.updateCurentuserprofile({"profilePictureUrl":fireBaseUrl});   
      this.setState({profilepictureupdated:"end"})  
     })
  })
  }

  render() {
    const { classes, user,profile,history} = this.props;
    const { modalOpen } = this.state;
    if(!user.isAuthenticated && !user.loading ){
    history.push('/login')
    }
    let profilevalues={
      bio:'',
      website:'',
      twitter:'',
      facebook:'',
      name:''
    }
        
     profilevalues.name=user.name;
    if(profile){
    if(profile.bio !== null){ profilevalues.bio=profile.bio};
    if(profile.website !== null) profilevalues.website=profile.website;
    
    if(profile.social) {
     if(profile.social.twitter !== null)  profilevalues.twitter=profile.social.twitter;
     if(profile.social.facebook !== null) profilevalues.facebook=profile.social.facebook;
    
    }
}
   if(this.state.profilepictureupdated === 'start'){
      alert(this.state.profilepictureupdated)
    return <CircularProgress />
   }
      return (
      <div>
        <NavbarContainer history={history}/>
        <div className={classes.backgroundContainer}>
          <Button
            variant="contained"
            className={classes.editButton}
            onClick={this.handleModalOpen}
          >
            Edit Profile
          </Button>
          <Card style={{}}>
            <CardContent
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width:'250px',
                font:'45px',
                
                
              }}
            >
             <Avatar aria-label="Initials" className={classes.avator} src={user.user.profileUrl}>
            </Avatar>
            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" 
              onChange={(e) =>{
                   this.state.image=e.target.files[0];
                   this.uploadHandler(e)
               }} 

            />
            <label htmlFor="icon-button-file">
         <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
          </label>
            <Typography variant="headline">{user.user.name}</Typography>
              <Typography>{user.user.email}</Typography>
            </CardContent>
          </Card>
        </div>
        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Paper className={classes.paper}>
                <Typography variant="display1">{user.user.following.length}</Typography>
                <Typography variant="headline">Following</Typography>
              </Paper>
              <Paper className={classes.paper}>
                <Typography variant="display1">{user.user.followers.length}</Typography>
                <Typography variant="headline">Followers</Typography>
              </Paper>
              <Paper className={classes.paper}>
              <Typography variant="headline">Joined </Typography>
                <Typography variant="display1">
                {moment(user.user.created).fromNow()}                 
                </Typography>
                
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Postfeed  isprofilepage={true} style={{padding:85}}></Postfeed>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          open={modalOpen}
          onClose={this.handleModalClose}
        >
          <div className={classes.modalPaper}>
            <form className={classes.formContainer} autoComplete="off">
              <Typography
                variant="title"
                id="modal-title"
                className={classes.spacing}
              >
                Edit Profile
              </Typography>
              <TextField
                required
                fullWidth
                className={classes.textField}
                defaultValue={user.user.name}
                id="name"
                label="Name"
                margin="normal"
                placeholder="What is your name?"
                name='name'
                onChange={this.handleChange}
              />
              <TextField
                required
                fullWidth
                className={classes.textField}
                defaultValue={user.user.email}
                id="email"
                label="Email"
                margin="normal"
                placeholder="This email is used to log in to your account."
                disabled

              />
              <TextField
                fullWidth
                className={classes.textField}
                defaultValue={profilevalues.bio}
                id="interests"
                label="bio"
                name='bio'
                margin="normal"
                placeholder="What are your interests?"
                onChange={this.handleChange}
              />
              <TextField
                fullWidth
                multiline
                className={classes.textField}
                defaultValue={profilevalues.website}
                id="other"
                name='website'
                label="website"
                margin="normal"
                placeholder="Website"
                onChange={this.handleChange}
              />
              
              <TextField
                fullWidth
                multiline
                className={classes.textField}
                defaultValue={profilevalues.twitter}
                id="other"
                name='twitter'
                label="Twitter "
                margin="normal"
                placeholder="twitted Id"
                onChange={this.handleChange}
              />
              <TextField
                fullWidth
                multiline
                className={classes.textField}                
                defaultValue={profilevalues.facebook}
                id="other"
                name='facebook'
                label="Facebook"
                margin="normal"
                placeholder="Facebook Id"
                onChange={this.handleChange}
              />
              <Button
                fullWidth
                color="primary"
                className={classes.saveButton}
                type="submit"                
                variant="contained"
                onClick={this.handleSubmit}
              >
                Save
              </Button>
            </form>
          </div>
        </Modal>
      </div>
    );
  }

}


function mapStateToProps ({auth,profile,posts}){
    return {user: auth,profile:profile.profile,posts:posts}
  };


export default  withStyles(styles)
  (connect( mapStateToProps,{getcurrentProfile,updateCurentuserprofile})
(ProfilePage));