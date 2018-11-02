import React, { Component } from "react";
import "../../App.css";
import { NavLink } from "react-router-dom";
import * as firebase from "firebase";
import swal from "sweetalert";



class AdminNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: false,
      data: false
    };

    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        debugger;
        swal("Logged Out successfully", "", "success");
        // this.props.history.replace("/SignIn");
      })
      .catch(function (error) {
        swal(error.message, "", "error");
      });
  }

  componentDidMount() {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("user", user.uid);
        console.log("user", user.email);
        this.setState({ user: true });
      }

    });
  }

  render() {
    let b;


    return (
      <div>
        <nav
          className="navbar navbar-expand-sm navbar-dark bg-primary flex-row"
          id="nav"
        >
          <a className="navbar-brand" href="#">
            Real-time Parking Booking System admin
          </a>
          <button
            className="navbar-toggler ml-lg-0"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse float-right" id="navbarSupportedContent">
            <ul className="nav navbar-nav ml-auto" id="navbar">

              <li className="nav-item">
                <NavLink activeClassName="active" to="/UserData">
                  <span className="nav-link">
                    User Data <span className="sr-only" />
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink activeClassName="active" to="/AdminBooking">
                  <span className="nav-link">
                    Bookings <span className="sr-only" />
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink activeClassName="active" to="/AdminFeedback">
                  <span className="nav-link">
                    Feedbacks <span className="sr-only" />
                  </span>
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle mr-3 mr-lg-0"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fa fa-user" />
                  <span className="caret" />
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <span className="dropdown-item" onClick={this.logOut}>
                    LogOut
                    </span>
                </div>
              </li>
            </ul>
          </div>

        </nav>
      </div>
    );
  }
}

export default AdminNavbar;
