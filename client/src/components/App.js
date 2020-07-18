import React from 'react'

import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { connect } from 'react-redux';
import HomePage from "./homepage/Homepage"
import ImageInput from "./homepage/imAGEINPUT";
import ProfilePage from './User/ProfilePage';
import Login from "./Oauth/Login";
import Signup from "./Oauth/Signup"
import * as actions from "../actions/OauthActions";
import NotFound from './NotFound';
import setAuthToken from "../actions/utils/setAuthToken";
import DiscoverPage  from "./User/DiscoverPage/Discoverpage";
import Friend from "./User/Friends";
import Settings from './User/Settings';
import UserProfile from './User/UserProfile'
const history=createHistory();
if(localStorage.token){
    setAuthToken(localStorage.token)
 }
 
class App extends React.Component {
 componentDidMount(){
   this.props.loadUser();
   
 }
   render(){
      if(this.props.auth.loading){
        return <div>Loading</div>
      }
  return(
  <Router history={history}>
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/signup" component={Signup} />
    <Route path="/login" component={Login} />
    <Route path="/image" component={ImageInput} />
    <Route path="/profile" component={ProfilePage} />
    <Route path="/userprofile/:id" component={UserProfile} />
    <Route path="/discover" component={DiscoverPage} />
    <Route path="/followers" component={Friend} />
    <Route path="/settings" component={Settings} />
    <Route path='*' component={NotFound} />
  </Switch>
</Router>)
}}
function mapStatetoprops(state){
  console.log(state.auth)
  return{auth:state.auth}
}

export default connect(mapStatetoprops,actions)(App);