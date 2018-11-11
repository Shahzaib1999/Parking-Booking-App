import React, { Component } from "react";
import "../../App.css";
import * as firebase from "firebase";
import swal from "sweetalert";

class UserFeedback extends Component {
    constructor(props) {
        super(props);

    }


    componentDidMount(){
        const db = firebase.firestore();
        var user = firebase.auth().currentUser.uid;
        var data1 = document.getElementById('data');
        data1.innerHTML = "";
        let a;

        db.collection('feedback').get().then(first => {
            first.forEach(second => {
                db.collection('feedback').doc(second.id).collection('messages').where('sender', '==', user).get().then(third => {
                    // debugger
                    third.forEach(fourth => {
                        db.collection("feedback")
                          .doc(second.id)
                          .collection("messages")
                          .doc(fourth.id)
                          .collection('message')
                          .orderBy('createdAt')
                          .get().then(fifth =>{


                              console.log(fourth.data().name)
                              var div = document.createElement('div');
                              var div1 = document.createElement('div');
                              var h3 = document.createElement("h3");
                              var h51 = document.createElement('h5');
                              var h52 = document.createElement('h5');
                              var h53 = document.createElement("h5");
                              var input = document.createElement('input');
                              var btn = document.createElement('button');
                              // var h54 = document.createElement('h5');
      
                              div.setAttribute('class','card mt-4 ml-4');
                              div.setAttribute('id','reply');
                              div1.setAttribute('class','card-body');
                              input.setAttribute('class','form-control');
                              input.setAttribute('id', 'send');
                              input.setAttribute('ticket',second.id);
                              btn.setAttribute("class", "btn btn-info mt-1");
                              btn.setAttribute('align','center');
                              btn.addEventListener('click',() =>this.send())
                              
                              h3.innerHTML = "Name: " + fourth.data().name;
                              h51.innerHTML = "Rating: " + fourth.data().rating;
                              btn.innerHTML = "Send";
                              h52.innerHTML = "Messages: ";                                  
                              // h53.innerHTML = "Reply: " + fourth.data().reply;
      
                              fifth.forEach(data => {
                                  var p = document.createElement('p');
                                  p.innerHTML = data.data().comment;      
                                  h53.appendChild(p);

                                })
                            
                            div.appendChild(div1);
                            div1.appendChild(h3);
                            div1.appendChild(h51);
                            div1.appendChild(h52);
                            div1.appendChild(h53);
                            div1.appendChild(input);
                            div1.appendChild(btn);
                            data1.appendChild(div);

                          })
                    
                    })
                })

            });
        })
    }

    send() {
        const db = firebase.firestore();
        const comment = document.getElementById("send").value;
        const ticket = document.getElementsByTagName('input')[0].attributes[2].nodeValue;
debugger
        if (!comment) {
            swal("Please type some message", "", "warning")
        }
        else {
                db.collection("feedback")
                .doc(ticket)
                .collection("messages")
                .doc(firebase.auth().currentUser.uid)
                .collection("message")
                .add({ comment, createdAt: Date.now() }).then(res =>{
                    swal("Sended Successfully", "", "success");
                    document.getElementById("send").value = "";
                    this.componentDidMount();
                }).catch(err => {
                    swal(err.message, "", "error")
                });
        }

    }

    render() {

        return <div className="container-fluid row" id="data">
            {/* data will be rendered here */}
        </div>;
    }
}

export default UserFeedback;