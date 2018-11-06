import React, { Component } from "react";
import "../../App.css";
import * as firebase from "firebase";
import swal from "sweetalert";


class Area3 extends Component {
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
            .catch(function (error) {
                swal(error.message, "", "error");
            });
    }

    book(id) {

        const db = firebase.firestore();
        var day = document.getElementById('date').value;
        var startTime = document.getElementById("time").value;
        var endTime = document.getElementById('endtime').value;
        document.getElementById('slots').innerHTML = "";

        var r = (Number(startTime.split(":")[0]) * 3600 + Number(startTime.split(":")[1]) * 60) * 1000;
        var f = (Number(endTime.split(":")[0]) * 3600 + Number(endTime.split(":")[1]) * 60) * 1000;

        db.collection('feedback').doc(id).set({

        })

        db.collection("parkingArea3")
            .doc(id)
            .collection("Booking")
            .add({
                day,
                startTime: r,
                endTime: f,
                uid: firebase.auth().currentUser.uid
            }).then(res => {
                swal("Booked Successfully", "", "success");
                document.getElementById("date").value = "";
                document.getElementById("time").value = "";
                document.getElementById("endtime").value = "";
            }).catch(err => {
                swal(err.message, "", "error");
            })

    }

    getData() {
        var date = new Date();
        var day = document.getElementById('date').value;
        var time = document.getElementById("time").value;
        var endtime = document.getElementById('endtime').value;

        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!

        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }

        var today = yyyy + '-' + mm + '-' + dd;
        var r = (Number(time.split(":")[0]) * 3600 + Number(time.split(":")[1]) * 60) * 1000;
        var f = (Number(endtime.split(":")[0]) * 3600 + Number(endtime.split(":")[1]) * 60) * 1000;
        var currenthours = date.getHours();
        var currentminitus = date.getMinutes();
        var a = ((currenthours * 3600) + (currentminitus * 60)) * 1000;
        var db = firebase.firestore();
        var slots = document.getElementById('slots');

        slots.innerHTML = "";

        db.collection('parkingArea3').orderBy('id', 'asc').get().then(res => {
            res.forEach(doc => {

                db.collection('parkingArea3').doc(doc.id).collection('Booking').get().then(querySnapshot => {
                    if (querySnapshot.size > 0) {

                        querySnapshot.docs.map(data => {

                            if (!date || !time || !endtime) {
                                swal("Fill all the fields", "", "error");
                            }
                            else if (today > day) {
                                swal("Given Date should be future or present", "Invalid Selection", "warning");
                            }
                            else if (today === day && r < a) {
                                swal("Given time should be future or present", "Invalid Selection", "warning");
                            }
                            else if (r >= f) {
                                swal("Ending time should be greater then the starting time", "Invalid Selection", "warning");
                            }
                            else if (data.data().startTime >= r) {

                                if (data.data().startTime > f) {

                                    if (document.getElementById(doc.id)) {
                                        var remove = document.getElementById(doc.id);
                                        if (remove.classList[1] === "btn-danger") {

                                        }
                                        else {
                                            remove.parentNode.removeChild(remove);
                                            var btn = document.createElement("button");
                                            btn.setAttribute("id", doc.id);
                                            btn.setAttribute("class", "btn btn-success mt-5 btn_slot");
                                            btn.addEventListener("click", () => this.book(doc.id));

                                            btn.innerHTML = "Slot " + doc.data().id;
                                            slots.appendChild(btn);
                                        }
                                    }
                                    else {
                                        var btn = document.createElement("button");
                                        btn.setAttribute("id", doc.id);
                                        btn.setAttribute("class", "btn btn-success mt-5 btn_slot");
                                        btn.addEventListener("click", () => this.book(doc.id));

                                        btn.innerHTML = "Slot " + doc.data().id;
                                        slots.appendChild(btn);
                                    }

                                }
                                else if (data.data().day === day) {

                                    if (document.getElementById(doc.id)) {
                                        var remove = document.getElementById(doc.id);
                                        remove.parentNode.removeChild(remove);
                                    }
                                    var btn = document.createElement("button");
                                    btn.setAttribute("id", doc.id);
                                    btn.setAttribute("class", "btn btn-danger mt-5 btn_slot");

                                    btn.innerHTML = "Slot " + doc.data().id;
                                    slots.appendChild(btn);
                                }
                                else {

                                    if (document.getElementById(doc.id)) {
                                        var remove = document.getElementById(doc.id);
                                        if (remove.classList[1] === "btn-danger") {

                                        }
                                        else {
                                            remove.parentNode.removeChild(remove);
                                            var btn = document.createElement("button");
                                            btn.setAttribute("id", doc.id);
                                            btn.setAttribute("class", "btn btn-success mt-5 btn_slot");
                                            btn.addEventListener("click", () => this.book(doc.id));

                                            btn.innerHTML = "Slot " + doc.data().id;
                                            slots.appendChild(btn);
                                        }
                                    }
                                    else {
                                        var btn = document.createElement("button");
                                        btn.setAttribute("id", doc.id);
                                        btn.setAttribute("class", "btn btn-success mt-5 btn_slot");
                                        btn.addEventListener("click", () => this.book(doc.id));

                                        btn.innerHTML = "Slot " + doc.data().id;
                                        slots.appendChild(btn);
                                    }

                                }

                            }
                            else if (data.data().startTime <= r) {

                                if (data.data().endTime < r) {

                                    if (document.getElementById(doc.id)) {
                                        var remove = document.getElementById(doc.id);
                                        if (remove.classList[1] === "btn-danger") {

                                        }
                                        else {
                                            remove.parentNode.removeChild(remove);
                                            var btn = document.createElement("button");
                                            btn.setAttribute("id", doc.id);
                                            btn.setAttribute("class", "btn btn-success mt-5 btn_slot");
                                            btn.addEventListener("click", () => this.book(doc.id));

                                            btn.innerHTML = "Slot " + doc.data().id;
                                            slots.appendChild(btn);
                                        }
                                    }
                                    else {
                                        var btn = document.createElement("button");
                                        btn.setAttribute("id", doc.id);
                                        // btn.setAttribute("id", "btn_slot");
                                        btn.setAttribute("class", "btn btn-success mt-5 btn_slot");
                                        btn.addEventListener("click", () => this.book(doc.id));

                                        btn.innerHTML = "Slot " + doc.data().id;
                                        slots.appendChild(btn);
                                    }

                                }
                                else if (data.data().day === day) {

                                    if (document.getElementById(doc.id)) {
                                        var remove = document.getElementById(doc.id);
                                        remove.parentNode.removeChild(remove);
                                    }
                                    var btn = document.createElement("button");
                                    btn.setAttribute("id", doc.id);
                                    btn.setAttribute("class", "btn btn-danger mt-5 btn_slot");

                                    btn.innerHTML = "Slot " + doc.data().id;
                                    slots.appendChild(btn);
                                }
                                else {
                                    console.log("else done");
                                    if (document.getElementById(doc.id)) {
                                        var remove = document.getElementById(doc.id);
                                        if (remove.classList[1] === "btn-danger") {

                                        }
                                        else {
                                            remove.parentNode.removeChild(remove);
                                            var btn = document.createElement("button");
                                            btn.setAttribute("id", doc.id);
                                            btn.setAttribute("class", "btn btn-success mt-5 btn_slot");
                                            btn.addEventListener("click", () => this.book(doc.id));

                                            btn.innerHTML = "Slot " + doc.data().id;
                                            slots.appendChild(btn);
                                        }
                                    }
                                    else {
                                        var btn = document.createElement("button");
                                        btn.setAttribute("id", doc.id);
                                        btn.setAttribute("class", "btn btn-success mt-5 btn_slot");
                                        btn.addEventListener("click", () => this.book(doc.id));

                                        btn.innerHTML = "Slot " + doc.data().id;
                                        slots.appendChild(btn);
                                    }

                                }

                            }
                            else if (data.data().endTime <= r) {

                                if (data.data().startTime > f) {

                                    if (document.getElementById(doc.id)) {
                                        var remove = document.getElementById(doc.id);
                                        if (remove.classList[1] === "btn-danger") {

                                        }
                                        else {
                                            remove.parentNode.removeChild(remove);
                                            var btn = document.createElement("button");
                                            btn.setAttribute("id", doc.id);
                                            btn.setAttribute("class", "btn btn-success mt-5 btn_slot");
                                            btn.addEventListener("click", () => this.book(doc.id));

                                            btn.innerHTML = "Slot " + doc.data().id;
                                            slots.appendChild(btn);
                                        }
                                    }
                                    else {
                                        var btn = document.createElement("button");
                                        btn.setAttribute("id", doc.id);
                                        btn.setAttribute("class", "btn btn-success mt-5 btn_slot");
                                        btn.addEventListener("click", () => this.book(doc.id));

                                        btn.innerHTML = "Slot " + doc.data().id;
                                        slots.appendChild(btn);
                                    }

                                }
                                else if (data.data().day === day) {

                                    if (document.getElementById(doc.id)) {
                                        var remove = document.getElementById(doc.id);
                                        remove.parentNode.removeChild(remove);
                                    }
                                    var btn = document.createElement("button");
                                    btn.setAttribute("id", doc.id);
                                    btn.setAttribute("class", "btn btn-danger mt-5 btn_slot");

                                    btn.innerHTML = "Slot " + doc.data().id;
                                    slots.appendChild(btn);
                                }
                                else {

                                    if (document.getElementById(doc.id)) {
                                        var remove = document.getElementById(doc.id);
                                        if (remove.classList[1] === "btn-danger") {

                                        }
                                        else {
                                            remove.parentNode.removeChild(remove);
                                            var btn = document.createElement("button");
                                            btn.setAttribute("id", doc.id);
                                            btn.setAttribute("class", "btn btn-success mt-5 btn_slot");
                                            btn.addEventListener("click", () => this.book(doc.id));

                                            btn.innerHTML = "Slot " + doc.data().id;
                                            slots.appendChild(btn);
                                        }
                                    }
                                    else {
                                        var btn = document.createElement("button");
                                        btn.setAttribute("id", doc.id);
                                        btn.setAttribute("class", "btn btn-success mt-5 btn_slot");
                                        btn.addEventListener("click", () => this.book(doc.id));

                                        btn.innerHTML = "Slot " + doc.data().id;
                                        slots.appendChild(btn);
                                    }

                                }

                            }
                            else {

                                if (document.getElementById(doc.id)) {
                                    var remove = document.getElementById(doc.id);
                                    if (remove.classList[1] === "btn-danger") {

                                    }
                                    else {
                                        remove.parentNode.removeChild(remove);
                                        var btn = document.createElement("button");
                                        btn.setAttribute("id", doc.id);
                                        btn.setAttribute("class", "btn btn-success mt-5 btn_slot");
                                        btn.addEventListener("click", () => this.book(doc.id));

                                        btn.innerHTML = "Slot " + doc.data().id;
                                        slots.appendChild(btn);
                                    }
                                }
                                else {
                                    var btn = document.createElement("button");
                                    btn.setAttribute("id", doc.id);
                                    btn.setAttribute("class", "btn btn-success mt-5 btn_slot");
                                    btn.addEventListener("click", () => this.book(doc.id));

                                    btn.innerHTML = "Slot " + doc.data().id;
                                    slots.appendChild(btn);
                                }

                            }

                        });

                    }

                    else {

                        if (!date || !time || !endtime) {
                            swal("Fill all the fields", "", "error");
                        }
                        else if (today > day) {
                            swal("Given Date should be future or present", "Invalid Selection", "warning");
                        }
                        else if (today === day && r < a) {
                            swal("Given time should be future or present", "Invalid Selection", "warning");
                        }
                        else if (r >= f) {
                            swal("Ending time should be greater then the starting time", "Invalid Selection", "warning");
                        }
                        else {
                            console.log('No data');
                            if (document.getElementById(doc.id)) {
                                var remove = document.getElementById(doc.id);
                                remove.parentNode.removeChild(remove);
                            }
                            var btn = document.createElement("button");
                            btn.setAttribute("id", doc.id);
                            btn.setAttribute("class", "btn btn-success mt-5 btn_slot");
                            btn.addEventListener("click", () => this.book(doc.id));

                            btn.innerHTML = "Slot " + doc.data().id;
                            slots.appendChild(btn);
                        }
                    }

                })

            });

        }).catch(err => {
            swal(err.message, "", "error");
        })

    }

    render() {
        return <div className="row">
            <div className="col-md-1" />
            <div className="col-md-10">
                <div className="card" id="park">
                    <div className="card-header text-white text-center bg-secondary">
                        <h2>Parking Area 3</h2>
                    </div>
                    <div className="card-body mt-5">
                        <div className="row">
                            <div className="col-md-6">
                                <label>Select Date:</label>
                                <input type="date" id="date" className="form-control" />
                                <label>Start Time:</label>
                                <input type="time" id="time" className="form-control" />
                                <label>End Time:</label>
                                <input type="time" id="endtime" className="form-control" />
                            </div>
                            <div className="col-md-6" />
                        </div>

                        <div className="row mt-5">
                            <div className="col-md-4" />
                            <div className="col-md-4">
                                <span className="btn btn-outline-dark d-block" onClick={this.getData}>
                                    Select Slot
                      </span>
                            </div>
                            <div className="col-md-4" />
                        </div>

                        <div className="row mt-5">
                            <div className="col-sm-2 col-md-2" />
                            <div className="col-sm-8 col-md-8" id="slots">
                                {/* Slots button will be rendered here */}
                            </div>
                            <div className="col-sm-2 col-md-2" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-1" />
        </div>;
    }
}

export default Area3;