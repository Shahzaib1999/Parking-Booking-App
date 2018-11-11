import React, { Component } from "react";
import "../../App.css";
import * as firebase from "firebase";
import swal from "sweetalert";

class UserFeedback extends Component {
    constructor(props) {
        super(props);

    }


    componentDidMount() {
        const db = firebase.firestore();
        var user = firebase.auth().currentUser.uid;
        var data1 = document.getElementById('data');
        data1.innerHTML = "";
        let a;

        db.collection('feedback').get().then(first => {
            first.forEach(second => {
                db.collection('feedback').doc(second.id).collection('messages').get().then(third => {
                    debugger
                    third.forEach(fourth => {
                        db.collection("feedback")
                            .doc(second.id)
                            .collection("messages")
                            .doc(fourth.id)
                            .collection('message')
                            .orderBy('createdAt')
                            .get().then(fifth => {


                                console.log(fourth.data().name)
                                var div = document.createElement('div');
                                var div1 = document.createElement('div');
                                var h3 = document.createElement("h5");
                                var h51 = document.createElement('h5');
                                var h52 = document.createElement('h5');
                                var h53 = document.createElement("h5");
                                var input = document.createElement('input');
                                var btn = document.createElement('button');

                                div.setAttribute('class', 'card mt-4 ml-4');
                                div.setAttribute('id', 'reply');
                                div1.setAttribute('class', 'card-body');
                                input.setAttribute('class', 'form-control');
                                input.setAttribute('id', 'send');
                                input.setAttribute("ticket", second.id);
                                input.setAttribute('a', fourth.id);
                                btn.setAttribute("class", "btn btn-info mt-1");
                                btn.setAttribute('align', 'center');
                                btn.addEventListener('click', () => this.send())

                                h3.innerHTML = "Id: " + fourth.id;
                                h51.innerHTML = "Rating: " + fourth.data().rating;
                                btn.innerHTML = "Send";
                                h52.innerHTML = "Messages: ";

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
        var comment = document.getElementsByTagName('input');
        var ticket;
        var ab;
        debugger
        for (let i = 0; i < comment.length; i++) {
            if (comment[i].value) {
                ticket = comment[i].attributes[2].nodeValue;
                ab = comment[i].attributes[3].nodeValue;
                comment = comment[i].value;
            }
            else {

            }
        }
        if (!comment) {
            swal("Please type some message", "", "warning")
        }
        else {
            db.collection("feedback")
                .doc(ticket)
                .collection("messages")
                .doc(ab)
                .collection("message")
                .add({ comment, createdAt: Date.now() }).then(res => {
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

        </div>;
    }
}

export default UserFeedback;