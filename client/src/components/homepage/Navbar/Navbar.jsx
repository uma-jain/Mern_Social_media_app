import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import { colors } from '@material-ui/core';
import { connect } from 'react-redux';
import * as actions from "../../../actions/OauthActions"
import Icon from '@material-ui/core/Icon';
import NavbarRightMenu from "./NavbarRightSide"
import NavbarLeftMenu from "./NavbarLeftMenu"

import {Link} from "react-router-dom"

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  colour:{
   background:'#607d8b',
   height:"60px"
    },
    logo: {
      color: '#fff',
      textDecoration: 'none'
    },
};

class Navbar extends Component {
 
  render() {
    const { classes ,auth,history} = this.props;
    
       return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.colour}>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <NavbarLeftMenu  user={auth.user}></NavbarLeftMenu>
            </IconButton>
            <Typography
              className={classes.flex}
              variant="title"
              color="inherit"
            >
              <Link className={classes.logo} to="/">
                MERN Social
              </Link>
            </Typography>
            <div>
            <NavbarRightMenu
             logoutUser={this.props.logoutUser} 
             user={auth.user}
             history={history}
             />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
function mapStateToProps ({auth}){
 
    return {auth: auth}
  };

export default withStyles(styles)(connect(mapStateToProps,actions)(Navbar));