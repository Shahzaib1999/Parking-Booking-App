import React, { Component } from "react";
import "../../App.css";
import * as firebase from "firebase";
import swal from "sweetalert";
import { NavLink } from "react-router-dom";

class Park extends Component {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);
  }

  logOut() {

    firebase.auth().signOut().then(() => {
      swal("Logged Out successfully", "", "success");
    }).catch(function (error) {
      swal(error.message, '', 'error');
    });
  }
  render() {
    return <div className="row">
      <div className="col-md-1" />
      <div className="col-md-10">
        <div className="card" id="park">
          <div className="card-header text-white text-center bg-dark">
            <h2>Select Area</h2>
          </div>
          <div className="card-body mt-5">
            <div className="row">
              <div className="col-md-2" />
              <div className="col-md-4">
                <NavLink activeClassName="active" to="/Park/Area1">
                  <span className="btn btn-outline-dark d-block park-btn">
                    Parking Area 1
                        </span>
                </NavLink>
              </div>
              <div className="col-md-4" id="responsive">
                <NavLink to="/Park/Area2">
                  <span className="btn btn-outline-dark d-block park-btn">
                    Parking Area 2
                        </span>
                </NavLink>
              </div>
              <div className="col-md-2" />
            </div>
            <div className="row mt-4">
              <div className="col-md-4" />
              <div className="col-md-4">
                <NavLink to="/Park/Area3">
                  <span className="btn btn-outline-dark d-block park-btn">
                    Parking Area 3
                        </span>
                </NavLink>
              </div>
              <div className="col-md-4" />
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-1" />
    </div>;
  }
}

export default Park;