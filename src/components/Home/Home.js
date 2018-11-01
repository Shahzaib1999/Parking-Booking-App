import React, { Component } from "react";
import "../../App.css";
import { NavLink } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user
    }
  }
  render() {
    return <div className="card mt-5" id="home">
      <div className="card-body">
        <center>
          <img src="https://www.mudelautod.ee/wp-content/uploads/loader.gif" id="img" className="img img-responsive" />
        </center>
        <h1 className="text-center">Welcome to Parking</h1>
        <h1 className="text-center"> Booking System</h1>
        <center>
          <NavLink to="/SignIn" id="user">
            <button className="btn btn-outline-primary mt-4">
              Park your Car
                  </button>
          </NavLink>
        </center>
      </div>
    </div>;
  }
}

export default Home;