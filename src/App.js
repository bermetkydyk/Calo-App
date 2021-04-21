// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Navbar />
      <>
        <LoginButton />
        <LogoutButton />
        <Profile />
      </>
      <Switch>
        <Route path='/' />
      </Switch>
    </Router>
  );
}

export default App;
