import React, { Component } from "react";
import "../../App.css";
import * as firebase from "firebase";
import swal from "sweetalert";

class Dashboard extends Component {
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
        var a = this;
        return (
            <div>Dashboard
                <button onClick={this.logOut}>LogOut</button>
            </div>
        )
    }
}

export default Dashboard;