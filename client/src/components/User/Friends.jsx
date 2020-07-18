import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Navbar from '../homepage/Navbar/Navbar';
import UserCard from '../User/DiscoverPage/UserCard';
import { getAllUsers } from "../../actions/OauthActions";

const styles = theme => ({
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  layout: {
    width: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3
    }
  }
});

export class FollowingPage extends Component {

    componentDidMount = () => {
     const { getAllUsers} = this.props;
    getAllUsers();
    }
    
  
  render() {
    const {auth,users:{users,loading},classes,history} = this.props;
   
    return loading ? (
      <div>Loading</div>
    ) : (
      <div>
        <Navbar history={history}/>
        <main style={{padding:'80px'}}>
          <div className={classes.layout, classes.cardGrid}>
            <Grid container justify="center" spacing={10}>
              {users.map(user =>{ 
                  if(user.followers.includes(auth.user._id)){
                return  <Grid item key={user._id} xs={12} sm={12} md={6} lg={6}>
                  <UserCard
                   user={user}     
                   isFollowing={true}
                  />
                </Grid>}}
              )}
            </Grid>
          </div>
        </main>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users
});


export default 
  withStyles(styles)(connect( mapStateToProps,{getAllUsers})(FollowingPage));