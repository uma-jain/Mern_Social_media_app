import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

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
import { Redirect } from "react-router-dom";

import { connect } from 'react-redux';
import * as actions from "../../actions/OauthActions"
const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    width: 400,
     backgroundColor:'90a4ae'  
  },
  paper:{
    position: 'absolute',
    padding: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width:'60%',
    height:'100%',
    justifyContent:'center',
    backgroundColor: 'theme.palette.background.paper',
    boxShadow: theme.shadows[5],
    [theme.breakpoints.down(980)]:{
      width:'100%'
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
class Login extends Component {
 
  state = {
  email: '',
  password: '',
  errors: {}
};

handleInputChange = (e) => {
  const { name, value } = e.target;
  this.setState(() => ({ [name]: value }));
};

handleSubmit = (e) => {
  e.preventDefault();
  const {  email, password } = this.state;
  const user = {
    email,
    password,
  };
  const { history,login } = this.props;
  login(user);

 }
  render() {
    const { classes, errors } = this.props;
    if(this.props.auth.loading){
      return <div>Loading</div>
    }
    if(this.props.auth.isAuthenticated ){
          return <Redirect to='/'></Redirect>
    }
    return (
           <div className={classes.container} styles={{backgroundColor:'90a4ae'}} >
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="headline" style={{fontSize:30}}>Log In</Typography>
            {this.props.errors!==null && this.props.errors.length >0 && this.props.errors.map((error)=>
        <div className={classes.errorText}>{error.msg}</div>
      )}
            <form onSubmit={this.handleSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input id="email" name="email" autoComplete="email" type="email" 
                onChange={this.handleInputChange} autoFocus />
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
              <Button
                type="submit"
                fullWidth
                variant="raised"
                color="primary"
                className={classes.submit}
              >
                Log In
              </Button>
            </form>
            <Typography className={classes.footer} variant="body1">
              {"Don't have an account? "}
              <NavLink to="/signup" className={classes.link}>
                Sign Up
              </NavLink>
            </Typography>
          </Paper>
        </main>
      </div>
    );
  }
}
function mapStateToProps({auth,error}){
  
  return{  errors: error,auth:auth}
};



export default withStyles(styles)(connect(mapStateToProps,actions)(Login));