import React, { Component } from 'react';
import './App.css';
import loading from './loading.gif';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import loadable from 'react-loadable';
import * as firebase from 'firebase';
import Navbar from "./components/Navbar/Navbar";
import AdminNavbar from "./components/AdminNavbar/AdminNavbar";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Area1 from "./components/Areas/Area1";
import Area2 from "./components/Areas/Area2";
import Area3 from "./components/Areas/Area3";
import Feedback from "./components/Feedback/Feedback";
import UserFeedback from "./components/UserFeedback/UserFeedback";
import Reply from "./components/Reply/Reply";
import AdminBooking from "./components/AdminBooking/AdminBooking";
import UserData from "./components/UserData/UserData";
import AdminFeedback from "./components/AdminFeedback/AdminFeedback";

const Home = loadable({
  loader: () => import("./components/Home/Home"),
  loading: () => <center>
    <img src="loading" className="img img-responsive" />
  </center>
})

const Park = loadable({
  loader: () => import("./components/Park/Park"),
  loading: () => (
    <center>
      <img src="loading" className="img img-responsive" />
    </center>
  )
});

const Details = loadable({
  loader: () => import("./components/Details/Details"),
  loading: () => (
    <center>
      <img src="loading" className="img img-responsive" />
    </center>
  )
});

class App extends Component {
  
  constructor() {
    super();

    this.state = {
      user: false,
      admin: false
    }

  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const db = firebase.firestore();
        console.log("user", user.uid);
        console.log("user", user.email);
        db.collection('Users').doc(user.uid).get().then(res =>{
          localStorage.setItem('name',res.data().name)

          if (res.data().role === 'admin') {
            this.setState({ admin: true });
          }
          else{
            this.setState({ user: true });
          }
        })
      }
      else{
        this.setState({user: false});
      }
    });
  }
  
  render() {
    const {user, admin} = this.state;
    
    return <Router>
        <div>
          {!admin && <Navbar />}
          {admin && <AdminNavbar />}
          <Route exact path="/" component={Home} />
          <Route path="/SignIn" render={() => (user && !admin ? <Redirect to="/Park" /> : <SignIn />)} />
          <Route path="/SignUp" render={() => (user && !admin ? <Redirect to="/Park" /> : <SignUp />)} />
          <Route path="/Feedback" render={() => (user && !admin ? <Feedback /> : <Redirect to="/SignIn" />)} />
          <Route path="/Reply" render={() => (user && !admin ? <Reply /> : <Redirect to="/SignIn" />)} />
          <Route path="/UserFeedback" render={() => (user && !admin ? <UserFeedback /> : <Redirect to="/SignIn" />)} />
          <Route path="/Details" render={() => (user && !admin ? <Details /> : <Redirect to="/SignIn" />)} />
          <Route exact path="/Park" render={() => (user && !admin ? <Park /> : <Redirect to="/SignIn" />)} />
          <Route path="/Park/Area1" render={() => (user && !admin ? <Area1 /> : <Redirect to="/SignIn" />)} />
          <Route path="/Park/Area2" render={() => (user && !admin ? <Area2 /> : <Redirect to="/SignIn" />)} />
          <Route path="/Park/Area3" render={() => (user && !admin ? <Area3 /> : <Redirect to="/SignIn" />)} />

          <Route path="/SignIn" render={() => (!user && admin && <Redirect to="/UserData" />)} />
          <Route path="/AdminBooking" render={() => (admin && !user ? <AdminBooking /> : <Redirect to="/SignIn" />)} />
          <Route path="/UserData" render={() => (admin && !user ? <UserData /> : <Redirect to="/SignIn" />)} />
          <Route path="/AdminFeedback" render={() => (admin && !user ? <AdminFeedback /> : <Redirect to="/SignIn" />)} />
        </div>
      </Router>;
  }
}

export default App;
