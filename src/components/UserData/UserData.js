import React, { Component } from "react";
import "../../App.css";
import * as firebase from "firebase";

class UserData extends Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        const db = firebase.firestore();
        var data1 = document.getElementById('data');

        debugger
        db.collection('Users').where('role', '==', 'user').get().then(data => {
            data.forEach(res => {
                var div = document.createElement("div");
                var div1 = document.createElement("div");
                var h3 = document.createElement("h3");
                var h51 = document.createElement("h5");
                var h52 = document.createElement("h5");
                var h53 = document.createElement("h5");

                div.setAttribute("class", "card mt-4 ml-4");
                div.setAttribute("id", "reply");
                div1.setAttribute("class", "card-body");

                h3.innerHTML = "Email: " + res.data().email;
                h51.innerHTML = "Name: " + res.data().name;

                div.appendChild(div1);
                div1.appendChild(h3);
                div1.appendChild(h51);
                data1.appendChild(div);
            });
        })
    }



    render() {

        return <div className="container-fluid row" id="data">

        </div>;
    }
}

export default UserData;