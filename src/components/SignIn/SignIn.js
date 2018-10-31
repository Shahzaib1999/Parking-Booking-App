import React, { Component } from 'react';
import '../../App.css';
import swal from 'sweetalert';
import * as firebase from 'firebase';
import { NavLink } from "react-router-dom";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.signIn = this.signIn.bind(this);
  }

  signIn() {
    const email = document.getElementById("email").value;
    const password = document.getElementById('password').value;
    if (email === '' || password === '') {
      swal('Fill all the fields', '', 'warning');
    }
    else {
      firebase.auth().signInWithEmailAndPassword(email, password).then(res => {
        console.log('Admin res =>', res.user);
        swal('SigIn successful', '', 'success');
        // this.props.history.replace("/Dashboard");
      }).catch(error => {
        swal(error.message, '', 'error');
      })

    }
  }


  render() {
    return <div className="row mt-5">
      <div className="col-md-1" />
      <div className="col-md-10">
        <div className="card" id="sign">
          <div className="card-header text-white text-center bg-primary">
            <h2>Sign In</h2>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label>Email address:</label>
              <input type="email" className="form-control" id="email" placeholder="Email" required />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input type="password" className="form-control" id="password" placeholder="Password" required />
            </div>
            <button className="btn btn-primary" onClick={this.signIn}>
              SignIn <i className="fa fa-sign-in" />
            </button> Don't have a account click <NavLink to="/SignUp">
              here
                </NavLink>
          </div>
        </div>
      </div>
      <div className="col-md-1" />
    </div>;
  }
}

export default SignIn;