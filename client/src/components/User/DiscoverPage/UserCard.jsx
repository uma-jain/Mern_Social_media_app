import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import { update_followings } from "../../../actions/Useractions";

const styles = theme => ({
  avatar: {
    paddingTop: theme.spacing.unit * 2
  },
  cardContent: {
    flexDirection: 'column'
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    margin:'auto',
    padding:'50px'
  },
  link: {
    textDecoration: 'none',
    textAlign: 'center',
    justifyContent: 'center',
   
  },
  name: {
    marginTop: theme.spacing.unit * 2,
    textAlign: 'center'
  },
  button:{
    backgroundColor:'#37474f',
    color:'white',
    marginRight:20
   
  },
  buttonsalign:{
            justifyContent: 'center',
            padding:15
  }
  
  
});

class  UserCard extends React.Component {
  
  render(){
    const { classes, user,update_followings,isFollowing }=this.props
    
  return(
  <Card style={{padding:40,justifyContent: 'center',backgroundColor:'#eceff1'}}>
        <div className={classes.container, classes.cardContent}>
      <Avatar style={{margin:'auto'}} className='avatar' src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRONmS_QTUl_bSx28J4PRjQ03HFgn8c9q1QJPvWByJZmBu4o_XD&usqp=CAU'>
      </Avatar>
      <Typography
        gutterBottom
        className={classes.name}
        variant="headline"
        component="h2"
      >
        {user.name}
      </Typography>
      <CardActions className={classes.buttonsalign}>
        <Link className={classes.link} to={`/userprofile/${user._id}`}>
          <Button size="large" variant="outlined" className={classes.button} color="#37474f" >
            View Profile
          </Button>
        </Link>
        <Button size="large"  variant="outlined" onClick={()=>{update_followings(user._id)}}>
         {isFollowing ?' Unfollow ':'Follow'}
        </Button>
      </CardActions>
    </div>
  </Card>
  )
  }
};
UserCard.propTypes = {

  classes: PropTypes.object.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
}
export default withStyles(styles)(connect(null,{update_followings})(UserCard));