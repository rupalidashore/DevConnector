
import React , { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import jwt_decode from'jwt-decode';
import './App.css';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { SET_CURRENT_USER } from './actions/types';
import { logoutUser } from './actions/authActions';
import PrivateRoute from "./components/common/PrivateRoute";
import { clearCurrentProfile } from "./actions/profileActions";
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import NotFound from "./components/not-found/NotFound";

if (localStorage.jwtToken){
  
  //Decode token
  const decoded = jwt_decode(localStorage.jwtToken);

  //check for expired token
 const currentTime = Date.now() / 1000;
 if(decoded.exp < currentTime){
//Expired
   //Logout user
   store.dispatch(logoutUser());
    //Redirect user to login
   window.location.href = '/login';
 } else{

      //Set token to auth header
        setAuthToken(localStorage.jwtToken);
        //dispatch
          store.dispatch({
            type:SET_CURRENT_USER,
            payload:decoded
          });
  }
  } 
  class App extends Component {
    render() {
      return (
        <Provider store={store}>
          <Router>
            <div className="App">
              <Navbar />
              <Route exact path="/" component={Landing} />
              <div className="container">
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profiles" component={Profiles} />
                <Route exact path="/profile/:handle" component={Profile} />
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/create-profile"
                    component={CreateProfile}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/edit-profile"
                    component={EditProfile}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/add-experience"
                    component={AddExperience}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/add-education"
                    component={AddEducation}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/feed" component={Posts} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/post/:id" component={Post} />
                </Switch>
                <Route exact path="/not-found" component={NotFound} />
              </div>
              <Footer />
            </div>
          </Router>
        </Provider>
      );
    }
  }
  

export default App;
