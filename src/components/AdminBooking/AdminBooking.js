import React, { Component } from "react";
import "../../App.css";
import { NavLink, Link } from "react-router-dom";
import * as firebase from "firebase";
import swal from "sweetalert";

class AdminBooking extends Component {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);
    this.getData = this.getData.bind(this);
  }

  logOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        swal("Logged Out successfully", "", "success");
      })
      .catch(function(error) {
        swal(error.message, "", "error");
      });
  }

  delete1(doc, id) {
    const db = firebase.firestore();

    db.collection("parkingArea1")
      .doc(doc)
      .collection("Booking")
      .doc(id)
      .delete()
      .then(function() {})
      .then(res => {
        swal("Document successfully deleted!", "", "success");
        this.getData();
      })
      .catch(error => {
        swal("Error removing document: ", "", error);
      });
  }

  delete2(doc, id) {
    const db = firebase.firestore();

    db.collection("parkingArea2")
      .doc(doc)
      .collection("Booking")
      .doc(id)
      .delete()
      .then(function() {})
      .then(res => {
        swal("Document successfully deleted!", "", "success");
        this.getData();
      })
      .catch(error => {
        swal("Error removing document: ", "", error);
      });
  }

  delete3(doc, id) {
    const db = firebase.firestore();

    db.collection("parkingArea2")
      .doc(doc)
      .collection("Booking")
      .doc(id)
      .delete()
      .then(function() {})
      .then(res => {
        swal("Document successfully deleted!", "", "success");
        this.getData();
      })
      .catch(error => {
        swal("Error removing document: ", "", error);
      });
  }

  getData() {
    var db = firebase.firestore();
    var slots = document.getElementById("data");
    slots.innerHTML = "";
    debugger;

    db.collection("parkingArea1")
      .orderBy("id", "asc")
      .get()
      .then(res => {
        res.forEach(doc => {
          db.collection("parkingArea1")
            .doc(doc.id)
            .collection("Booking")
            .get()
            .then(querySnapshot => {
              if (querySnapshot.size > 0) {
                querySnapshot.docs.map(data => {
                  var jumbotron = document.createElement("div");
                  var h3 = document.createElement("h3");
                  var h41 = document.createElement("h4");
                  var h42 = document.createElement("h4");
                  var h43 = document.createElement("h4");
                  var h44 = document.createElement("h4");
                  var h45 = document.createElement("h4");
                  var btn = document.createElement("button");

                  var st = data.data().startTime;
                  var et = data.data().endTime;
                  var starthour = Math.round(st / 3600000);
                  var startmin = (st % 3600000) / 60000;
                  var endhour = Math.round(et / 3600000);
                  var endmin = (et % 3600000) / 60000;

                  if (starthour < 10) {
                    starthour = "0" + starthour;
                  }
                  if (startmin < 10) {
                    startmin = "0" + startmin;
                  }

                  if (endhour < 10) {
                    endhour = "0" + endhour;
                  }
                  if (endmin < 10) {
                    endmin = "0" + endmin;
                  }

                  jumbotron.setAttribute(
                    "class",
                    "jumbotron border border-primary"
                  );
                  btn.setAttribute("class", "btn btn-primary float-right ml-2");
                  btn.setAttribute("id", "cancel");
                  btn.addEventListener("click", () =>
                    this.delete1(doc.id, data.id)
                  );

                  btn.innerHTML = "Cancel Booking";
                  h3.innerHTML = "Ticket No. " + doc.id;
                  h41.innerHTML = "Parking Area 1";
                  h42.innerHTML = "Slot: " + doc.data().id;
                  h43.innerHTML = "Date: " + data.data().day;
                  h44.innerHTML = "Start Time: " + starthour + ":" + startmin;
                  h45.innerHTML = "End Time: " + endhour + ":" + endmin;

                  jumbotron.appendChild(h3);
                  jumbotron.appendChild(h41);
                  jumbotron.appendChild(h42);
                  jumbotron.appendChild(h43);
                  jumbotron.appendChild(h44);
                  jumbotron.appendChild(h45);
                  jumbotron.appendChild(btn);
                  slots.appendChild(jumbotron);
                });
              }
            });
        });
      });

    db.collection("parkingArea2")
      .orderBy("id", "asc")
      .get()
      .then(res => {
        res.forEach(doc => {
          db.collection("parkingArea2")
            .doc(doc.id)
            .collection("Booking")
            .get()
            .then(querySnapshot => {
              if (querySnapshot.size > 0) {
                querySnapshot.docs.map(data => {
                  var jumbotron = document.createElement("div");
                  var h3 = document.createElement("h3");
                  var h41 = document.createElement("h4");
                  var h42 = document.createElement("h4");
                  var h43 = document.createElement("h4");
                  var h44 = document.createElement("h4");
                  var h45 = document.createElement("h4");
                  var btn = document.createElement("button");

                  var st = data.data().startTime;
                  var et = data.data().endTime;
                  var starthour = Math.round(st / 3600000);
                  var startmin = (st % 3600000) / 60000;
                  var endhour = Math.round(et / 3600000);
                  var endmin = (et % 3600000) / 60000;

                  if (starthour < 10) {
                    starthour = "0" + starthour;
                  }
                  if (startmin < 10) {
                    startmin = "0" + startmin;
                  }

                  if (endhour < 10) {
                    endhour = "0" + endhour;
                  }
                  if (endmin < 10) {
                    endmin = "0" + endmin;
                  }

                  jumbotron.setAttribute(
                    "class",
                    "jumbotron border border-primary"
                  );
                  btn.setAttribute("class", "btn btn-primary float-right");
                  btn.setAttribute("id", "cancel");
                  btn.addEventListener("click", () =>
                    this.delete2(doc.id, data.id)
                  );

                  
                  
                  btn.innerHTML = "Cancel Booking";
                  h3.innerHTML = "Ticket No. " + doc.id;
                  h41.innerHTML = "Parking Area 1";
                  h42.innerHTML = "Slot: " + doc.data().id;
                  h43.innerHTML = "Date: " + data.data().day;
                  h44.innerHTML = "Start Time: " + starthour + ":" + startmin;
                  h45.innerHTML = "End Time: " + endhour + ":" + endmin;

                  jumbotron.appendChild(h3);
                  jumbotron.appendChild(h41);
                  jumbotron.appendChild(h42);
                  jumbotron.appendChild(h43);
                  jumbotron.appendChild(h44);
                  jumbotron.appendChild(btn);
                  slots.appendChild(jumbotron);
                });
              }
            });
        });
      });

    db.collection("parkingArea3")
      .orderBy("id", "asc")
      .get()
      .then(res => {
        res.forEach(doc => {
          db.collection("parkingArea3")
            .doc(doc.id)
            .collection("Booking")
            .get()
            .then(querySnapshot => {
              if (querySnapshot.size > 0) {
                querySnapshot.docs.map(data => {
                  var jumbotron = document.createElement("div");
                  var h3 = document.createElement("h3");
                  var h41 = document.createElement("h4");
                  var h42 = document.createElement("h4");
                  var h43 = document.createElement("h4");
                  var h44 = document.createElement("h4");
                  var h45 = document.createElement("h4");
                  var btn = document.createElement("button");
                  
                  var st = data.data().startTime;
                  var et = data.data().endTime;
                  var starthour = Math.round(st / 3600000);
                  var startmin = (st % 3600000) / 60000;
                  var endhour = Math.round(et / 3600000);
                  var endmin = (et % 3600000) / 60000;

                  if (starthour < 10) {
                    starthour = "0" + starthour;
                  }
                  if (startmin < 10) {
                    startmin = "0" + startmin;
                  }

                  if (endhour < 10) {
                    endhour = "0" + endhour;
                  }
                  if (endmin < 10) {
                    endmin = "0" + endmin;
                  }

                  jumbotron.setAttribute(
                    "class",
                    "jumbotron border border-primary"
                  );
                  btn.setAttribute("class", "btn btn-primary float-right");
                  btn.setAttribute("id", "cancel");
                  btn.addEventListener("click", () =>
                    this.delete3(doc.id, data.id)
                  );

                  
                  btn.innerHTML = "Cancel Booking";
                  h3.innerHTML = "Ticket No. " + doc.id;
                  h41.innerHTML = "Parking Area 1";
                  h42.innerHTML = "Slot: " + doc.data().id;
                  h43.innerHTML = "Date: " + data.data().day;
                  h44.innerHTML = "Start Time: " + starthour + ":" + startmin;
                  h45.innerHTML = "End Time: " + endhour + ":" + endmin;

                  jumbotron.appendChild(h3);
                  jumbotron.appendChild(h41);
                  jumbotron.appendChild(h42);
                  jumbotron.appendChild(h43);
                  jumbotron.appendChild(h44);
                  jumbotron.appendChild(btn);
                  slots.appendChild(jumbotron);
                });
              }
            });
        });
      });
  }

  render() {
    return (
      <div className="container mt-4" id="data">
        <center>
          <input
            type="button"
            className="btn btn-info float-center mt-5"
            value="Show Bookings"
            onClick={this.getData}
          />
        </center>
      </div>
    );
  }
}

export default AdminBooking;