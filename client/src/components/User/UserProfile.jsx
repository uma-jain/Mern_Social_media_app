import React, { Component } from 'react'
import {retrieveUser  } from "../../actions/Useractions";
import {connect} from "react-redux";


import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import * as moment from 'moment';
import PostFeed from "../homepage/Posts/PostFeed";

import Avatar from '@material-ui/core/Avatar';

import Button from '@material-ui/core/Button';
import NavbarContainer from '../homepage/Navbar/Navbar';
import { update_followings } from "../../actions/Useractions";


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

 class UserProfile extends Component {
     componentDidMount(){
        const { id } = this.props.match.params
        if(id === this.props.loggedinuser._id){
                  return this.props.history.push('/profile')
        }
        this.props.retrieveUser(id)

     }

    render() {
        const {loggedinuser,retrievedUser,classes,history,update_followings}=this.props
        return (
            <div>
            <NavbarContainer history={history}/>
           <div className={classes.backgroundContainer}>
             
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
                <Avatar aria-label="Initials" className={classes.avator} src={retrievedUser.profileUrl}>
               </Avatar>
              
               <label htmlFor="icon-button-file">
           
             </label>
               <Typography variant="headline" style={{fontSize:'20px',padding:10}}>{retrievedUser.name}</Typography>
                  <Button variant="contained" style={{backgroundColor:'#607d8b',color:'white'}} onClick={()=>{update_followings(retrievedUser._id)}} >
                   { loggedinuser.following && loggedinuser.following.includes(retrievedUser._id)?'UnFollow':'Folllow' } 
                  </Button>
                   </CardContent>
                   
             </Card>
           </div>
         
          <Grid container className={classes.root} spacing={16}>
             <Grid item xs={12}>
               <Grid container justify="center">
                 <Paper className={classes.paper}>
                   <Typography variant="display1">{retrievedUser.following && retrievedUser.following.length}</Typography>
                   <Typography variant="headline">Following</Typography>
                 </Paper>
                 <Paper className={classes.paper}>
                   <Typography variant="display1">{retrievedUser.followers && retrievedUser.followers.length}</Typography>
                   <Typography variant="headline">Followers</Typography>
                 </Paper>
                 <Paper className={classes.paper}>
                 <Typography variant="headline">Joined </Typography>
                   <Typography variant="display1">
                   {moment(retrievedUser.created).fromNow()}                 
                   </Typography>
                   
                 </Paper>
               </Grid>
             </Grid>
           </Grid>
           
           { loggedinuser.following && loggedinuser.following.includes(retrievedUser._id)?
            <PostFeed isUserProfile={true} retrievedUserId={retrievedUser._id}></PostFeed>
           
           :null } 
                  
        
               </div>
        )
    }
}
const mapStateToProps=({auth,users})=>{
 return{
    loggedinuser:auth.user,
    retrievedUser:users.retrievedUser
}
}

export default withStyles(styles)(connect(mapStateToProps,{retrieveUser,update_followings})(UserProfile))
