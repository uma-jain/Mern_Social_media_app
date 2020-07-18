import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Link } from "react-router-dom";

import IconButton from '@material-ui/core/IconButton';
const styles = {
  menuButton: {
    color: '#fff',
    fontSize: '20px',
    marginRight: '-20px',
    textTransform: 'none',

  }, link: {
    outline: 'none',
    textDecoration: 'none',
    color:'black'
  },
};

class NavbarRightMenu extends Component {
  state = {
    anchorEl: null
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, logoutUser,user,history } = this.props;
   
    const { anchorEl } = this.state;

    return (
      <div>
        
         
          
        <IconButton color="secondary"  aria-owns={anchorEl ? 'right-menu' : null}
          aria-haspopup="true"
          className={classes.menuButton}
          onClick={this.handleClick}>
          {user.name } 
          <ArrowDropDownIcon
          ></ArrowDropDownIcon>
      </IconButton>
        <Menu
          id="right-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          style={{marginTop:`50px`}}
        >
           <Link className={classes.link} to={`/profile`}>
            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          </Link>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
          <MenuItem onClick={()=>logoutUser(history)}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}


export default withStyles(styles)(NavbarRightMenu);