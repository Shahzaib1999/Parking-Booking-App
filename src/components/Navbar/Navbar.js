import React, { Component } from "react";
import "../../App.css";
import { NavLink } from "react-router-dom";
import * as firebase from "firebase";
import swal from "sweetalert";



class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: false,
      data: true
    };

    this.logOut = this.logOut.bind(this);

  }

  logOut() {

    firebase.auth().signOut().then(() => {
      debugger
      swal("Logged Out successfully", "", "success");
      // this.props.history.replace("/SignIn");
    }).catch(function (error) {
      swal(error.message, '', 'error');
    });
  }


  componentDidMount() {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const db = firebase.firestore();
        console.log("user", user.uid);
        console.log("user", user.email);
        this.setState({ user: true });


        db.collection('parkingArea1').orderBy('id', 'asc').get().then(res => {
          res.forEach(doc => {
            db.collection('parkingArea1').doc(doc.id).collection('Booking').where("uid", "==", firebase.auth().currentUser.uid).get().then(
              querySnapshot => {
                if (querySnapshot.size > 0) {
                  this.setState({ data: true })
                }
              });
          })
        })

        db.collection('parkingArea2').orderBy('id', 'asc').get().then(res => {
          res.forEach(doc => {
            db.collection('parkingArea2').doc(doc.id).collection('Booking').where("uid", "==", firebase.auth().currentUser.uid).get().then(
              querySnapshot => {
                if (querySnapshot.size > 0) {
                  this.setState({ data: true })
                }
              });
          })
        })

        db.collection('parkingArea3').orderBy('id', 'asc').get().then(res => {
          res.forEach(doc => {
            db.collection('parkingArea3').doc(doc.id).collection('Booking').where("uid", "==", firebase.auth().currentUser.uid).get().then(
              querySnapshot => {
                if (querySnapshot.size > 0) {
                  this.setState({ data: true })
                }
              });
          })
        })


      }
    });

  }


  render() {
    const { data, user } = this.state;
    let b;

    if (data && user) {
      b = <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle mr-3 mr-lg-0" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Feedback
            <span className="caret" />
        </a>
        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">

          <NavLink activeClassName="active" to="/Feedback">
            <span className="dropdown-item">
              Give Feedback <span className="sr-only" />
            </span>
          </NavLink>

          <NavLink activeClassName="active" to="/UserFeedback">
            <span className="dropdown-item">
              See Feedback <span className="sr-only" />
            </span>
          </NavLink>


        </div>
      </li>
    }
    else {

    }

    return <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary flex-row" id="nav">
        <a className="navbar-brand" href="#" id="navHeading">
          Real-time Parking Booking System
          </a>
        <button className="navbar-toggler ml-lg-0" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>


        {user ?
          <div className="collapse navbar-collapse float-right" id="navbarSupportedContent">
            <ul className="nav navbar-nav ml-auto" id="navbar">
              <li className="nav-item">
                <NavLink exact activeClassName="active" to="/">
                  <span className="nav-link">
                    Home <span className="sr-only" />
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink activeClassName="active" to="/Park">
                  <span className="nav-link">
                    Book Parking <span className="sr-only" />
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink activeClassName="active" to="/Details">
                  <span className="nav-link">
                    Details <span className="sr-only" />
                  </span>
                </NavLink>
              </li>

              {b}

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle mr-3 mr-lg-0" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="fa fa-user" />
                  <span className="caret" />
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                  <span className="dropdown-item" onClick={this.logOut}>
                    LogOut
                          </span>
                </div>
              </li>
            </ul>
          </div>
          :
          <div className="collapse navbar-collapse float-right" id="navbarSupportedContent">
            <ul className="nav navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink exact activeClassName="active" to="/">
                  <span className="nav-link">
                    Home <span className="sr-only" />
                  </span>
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle mr-3 mr-lg-0" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="fa fa-user" />
                  <span className="caret" />
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                  <span>
                    <NavLink activeClassName="active" to="/SignIn" id="user">
                      <span className="dropdown-item">
                        SignIn
                          </span>
                    </NavLink>

                    <NavLink activeClassName="active" to="/SignUp" id="user">
                      <span className="dropdown-item">
                        Register
                          </span>
                    </NavLink>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        }

      </nav>
    </div>;
  }
}

export default Navbar;
