import React, { Component } from "react";
import "../../App.css";
import * as firebase from "firebase";
import swal from "sweetalert";

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.send = this.send.bind(this);
  }

  componentDidMount() {
    const db = firebase.firestore();

    db.collection('parkingArea1').orderBy('id', 'asc').get().then(res => {
      res.forEach(doc => {
        db.collection('parkingArea1').doc(doc.id).collection('Booking').where("uid", "==", firebase.auth().currentUser.uid).get().then(
          querySnapshot => {
            if (querySnapshot.size > 0) {

              var ticket = document.getElementById('ticket');
              var option = document.createElement('option');


              option.innerHTML = doc.id;
              ticket.appendChild(option);

            }
          });
      })
    });

    debugger
    db.collection('parkingArea2').orderBy('id', 'asc').get().then(res => {
      res.forEach(doc => {
        db.collection('parkingArea2').doc(doc.id).collection('Booking').where("uid", "==", firebase.auth().currentUser.uid).get().then(
          querySnapshot => {
            if (querySnapshot.size > 0) {
              var ticket = document.getElementById('ticket');
              var option = document.createElement('option');

              option.innerHTML = doc.id;
              ticket.appendChild(option);
            }
          });
      })
    });

    db.collection('parkingArea3').orderBy('id', 'asc').get().then(res => {
      res.forEach(doc => {
        db.collection('parkingArea3').doc(doc.id).collection('Booking').where("uid", "==", firebase.auth().currentUser.uid).get().then(
          querySnapshot => {
            if (querySnapshot.size > 0) {
              var ticket = document.getElementById('ticket');
              var option = document.createElement('option');

              option.innerHTML = doc.id;
              ticket.appendChild(option);
            }
          });
      })
    })

  }

  send() {
    const db = firebase.firestore();
    const ticket = document.getElementById('ticket').value;
    const email = document.getElementById('email').value;
    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value;
    var name = localStorage.getItem('name');


    debugger
    if (!ticket || !email || !rating || !comment) {
      swal("Fill all the fields", "", "warning")
    }
    else {
      db.collection("feedback").doc(ticket)
        .collection('messages').doc(firebase.auth().currentUser.uid)
        .set({
          name,
          email,
          rating,
          sender: firebase.auth().currentUser.uid

        }).then(res => {
          db.collection("feedback")
            .doc(ticket)
            .collection("messages")
            .doc(firebase.auth().currentUser.uid)
            .collection("message")
            .add({ comment, createdAt: Date.now() });
          swal("Sended Successfully", "", "success");
          document.getElementById("email").value = "";
          document.getElementById('comment').value = "";
        }).catch(err => {
          swal(err.message, "", "error")
        });
    }

    //     db.collection("feedback").doc()
    //           .collection('messages').doc(ticket)
    //           .set({
    //             ticket,
    //             email,
    //             rating,
    //             comment,
    //             sender: firebase.auth().currentUser.uid
    //           }).then(res => {
    //             swal("Sended Successfully", "", "success");
    //             document.getElementById("email").value = "";
    //             document.getElementById('comment').value = "";
    //           }).catch(err => {
    //             swal(err.message, "", "error")
    //           });

    // })



  }


  render() {
    return <div className="row mt-5">
      <div className="col-md-1" />
      <div className="col-md-10">
        <div className="card" id="sign">
          <div className="card-header text-white text-center bg-primary">
            <h2>Feedback Form</h2>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label>Ticket No.:</label><br />
              <select className="form-control" id="ticket">
                {/* options will rendered here  */}
              </select>
            </div>
            <div className="form-group">
              <label>Email address:</label>
              <input type="email" className="form-control" id="email" placeholder="Email" />
            </div>
            <div className="form-group">
              <label>Select Rating:</label><br />
              <select className="form-control" id="rating">
                <option>1 star</option>
                <option>2 star</option>
                <option>3 star</option>
                <option>4 star</option>
                <option>5 star</option>
              </select>
            </div>
            <div className="form-group">
              <label>Message:</label>
              <textarea className="form-control" rows="5" id="comment"></textarea>
            </div>

            <button className="btn btn-primary" onClick={this.send}>Submit</button>
          </div>
        </div>
      </div>
      <div className="col-md-1" />
    </div>;
  }
}

export default Feedback;