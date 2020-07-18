import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import * as actions from "../../actions/OauthActions"

import { Redirect } from "react-router-dom";
const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    width: 400,
     backgroundColor:'90a4ae'  
  },
  paper:{
    position: 'absolute',
    padding: theme.spacing.unit * 37,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width:'60%',
    height:'100%',
    justifyContent:'center',
    backgroundColor: 'theme.palette.background.paper',
    boxShadow: theme.shadows[5],
    [theme.breakpoints.down(1380)]:{
     
      padding:'100px'
    },
    [theme.breakpoints.down(680)]:{
      width:'100%',
      padding:'30px'
    },
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  link: {
    textDecoration: 'none'
  },
  errorText: {
    color: '#D50000',
    marginTop: '5px'
  },
  footer: {
    marginTop: theme.spacing.unit * 2
  }
});

  
  export class Signup extends Component {
    state = {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    };
  
    handleInputChange = (e) => {
      const { name, value } = e.target;
      this.setState(() => ({ [name]: value }));
    };
  
    handleSubmit = (e) => {
      e.preventDefault();
      const { name,email, password , passwordConfirm} = this.state;
      const user = {
        name,
        email,
        password,
        passwordConfirm
      };
      
      const { history, registerUser } = this.props;
      
      registerUser(user, history);
    };
      render() {
        if(this.props.auth.isAuthenticated ){
          return <Redirect to='/'></Redirect>
        }
        const { classes, errors } = this.props;
          return (
              <div>
                  <React.Fragment >
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="headline" style={{fontSize:30}}>Sign Up</Typography>
            {this.props.errors!==null && this.props.errors.length >0 && this.props.errors.map((error)=>
        <div className={classes.errorText}>{error.msg}</div>
      )}
            <form onSubmit={this.handleSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input id="name" 
                name="name" 
                autoComplete="name" 
                autoFocus 
                onChange={this.handleInputChange}  
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input id="email" 
                name="email"  
                type="email" 
                autoComplete="email" 
                onChange={this.handleInputChange}  
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.handleInputChange}  
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Confirm Password</InputLabel>
                <Input
                  onChange={this.handleInputChange}
                  name="passwordConfirm"
                  type="password"
                  id="passwordConfirm"
                  autoComplete="current-password-confirm"
                  
                />
                </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="raised"
                color="primary"
                className={classes.submit}
              >
                Create Account
              </Button>
            </form>
            <Typography className={classes.footer} variant="body1">
              {'Already have an account? '}
              <NavLink to="/login" className={classes.link}>
                Log In
              </NavLink>
            </Typography>
          </Paper>
        </main>
      </React.Fragment>
              </div>
          )
      }
  }
  function mapStateToProps({error,auth}){
    
    return{  errors:error,auth:auth}
  };
  
  export default withStyles(styles)(connect(mapStateToProps,actions)(Signup))
  