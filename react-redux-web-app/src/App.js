import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import {
  Footer
} from "mdbreact";
import jwt_decode from 'jwt-decode';
import './App.css';
import { Provider } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './Redux/actions/authentication';
import store from './Redux/store';
import Routes from './Routes';
import Header from './components/Header/Header'

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store = { store }>
      <Router>
        <div>
          <Header />
        <main>
          <Routes />
        </main>
        <Footer color="indigo">
            <p className="footer-copyright mb-0 py-3 text-center">
              &copy; {new Date().getFullYear()} Copyright:{" "}
            </p>
          </Footer>
          </div>
      </Router>
      </Provider>

    );
  }
}

export default App;
