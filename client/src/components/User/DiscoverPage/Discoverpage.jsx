import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { getAllUsers } from '../../../actions/OauthActions';
import Navbar from '../../homepage/Navbar/Navbar'
import UserCard from './UserCard';

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
export class DiscoverPage extends Component {

  componentDidMount = () => {
    
       const { history, getAllUsers} = this.props;
     getAllUsers();
    
    
  };

  render() {
    const { users:{users,loading},auth,classes} = this.props;
     
    return loading ? (
      <div>Loading</div>
    ) : (

      <div>
      <Navbar></Navbar>
        <main style={{padding:'80px'}}>
          <div className={classes.layout, classes.cardGrid}>
            <Grid container justify="center" spacing={10} >
              {users.map(user => {
                if(!user.followers.includes(auth.user._id)){
                 return   <Grid item key={user._id} xs={12} sm={12} md={6} lg={6}>
                  <UserCard 
                   user={user}     
                   isFollowing={false}/>
                </Grid>
                }
             }
              )
              }
            </Grid>
          </div>
        </main>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  users: state.users,
  auth:state.auth
});


export default withStyles(styles)(
  connect(
    mapStateToProps,
    {getAllUsers}
  )
(DiscoverPage));