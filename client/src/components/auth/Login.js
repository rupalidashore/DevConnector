import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
//import classnames from 'classnames';
import {loginUser} from '../../actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup'; 
//import { GET_ERRORS } from '../../actions/types';
 class Login extends Component {
  constructor(){
    super();
    this.state = {
     
      email:'',
      password:'',
      errors:{}
  }
}
  onChange(e){
    this.setState({[e.target.name]:e.target.value})
  }



  onSubmit(e){
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(newUser);

  }

  //component is about to be seen on screen(lifecycle event)
  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
  }
  
    componentWillReceiveProps(nextProps){
    if(nextProps.auth.isAuthenticated)
 //if user is authenticated then send them on next page
{
      this.props.history.push('/dashboard');
}
    if (nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
  }
  
  render() {
    const {errors} = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your DevConnector account</p>
              <form noValidate onSubmit={this.onSubmit.bind(this)}>

                <TextFieldGroup
                  placeholder = "Email Address"
                  name= "email"
                  type= "email"
                  value= {this.state.email} 
                  onChange= {this.onChange.bind(this)}
                  error = {errors.email}
                  />

              <TextFieldGroup
                  placeholder = "Password"
                  name= "password"
                  type= "password"
                  value= {this.state.password} 
                  onChange= {this.onChange.bind(this)}
                  error = {errors.password}
                  />
              <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth:state.auth,//auth information
  errors: state.errors
})

export default connect(mapStateToProps, {loginUser})(withRouter(Login));