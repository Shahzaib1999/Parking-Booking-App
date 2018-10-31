import React, { Component } from 'react';
import '../../App.css';
import * as firebase from 'firebase';
import swal from 'sweetalert';

class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            signUp: false
        }
        this.signUp.bind(this);
    }


    signUp() {
        const db = firebase.firestore();

        const email = document.getElementById("email").value;
        const name = document.getElementById("name").value;
        const password = document.getElementById('password').value;

        if (!email || !name || !password) {
            swal('Fill all the fields', '', 'warning');
        }
        else {

            firebase.auth().createUserWithEmailAndPassword(email, password).then(res => {

                db.collection("Users")
                    .doc(res.user.uid)
                    .set({ email, name, role: 'user' })
                    .then(function (res) {
                        swal("Registration Successful", "", "success");
                    })
                    .catch(function (error) {
                        swal(error.message, "", "error");
                    });


            }).catch(function (error) {
                swal(error.message, '', 'error');
            });

        }

    }

    render() {
        return <div className="row mt-5">
            <div className="col-md-1" />
            <div className="col-md-10">
                <div className="card" id="sign">
                    <div className="card-header text-white text-center bg-primary">
                        <h2>Sign Up</h2>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label>Email address:</label>
                            <input type="email" className="form-control" id="email" placeholder="Email" required />
                        </div>
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text" className="form-control" id="name" placeholder="Name" required />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password" className="form-control" id="password" placeholder="Password" required />
                        </div>

                        <button className="btn btn-primary" onClick={this.signUp}>
                            SignUp
                    </button>
                    </div>
                </div>
            </div>
            <div className="col-md-1" />
        </div>;
    }
}

export default SignUp;