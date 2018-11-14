import React, { Component } from "react";
import "../../App.css";
import * as firebase from "firebase";

class Feedback extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    const db = firebase.firestore();

    db.collection('Feedback')

    return <div className="container-fluid row">
      <div className="card mt-4 ml-4" id="reply">
        <div className="card-header" />
        <div className="card-body">
          <h3>Name: </h3>
          <h5>Rating: </h5>
          <h5>Message: </h5>
          <h5>Reply: </h5>
          <input type="text" className="form-control" placeholder="Reply" />
          <button className="btn btn-info mt-1" align="center">
            Send
                </button>
        </div>
      </div>
      <div className="card mt-4 ml-4" id="reply">
        <div className="card-header" />
        <div className="card-body">
          <h3>Name: </h3>
          <h5>Rating: </h5>
          <h5>Message: </h5>
          <h5>Reply: </h5>
          <input type="text" className="form-control" placeholder="Reply" />
          <button className="btn btn-info mt-1" align="center">
            Send
                </button>
        </div>
      </div>
    </div>;
  }
}

export default Feedback;