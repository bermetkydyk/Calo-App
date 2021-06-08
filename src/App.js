// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
// import LoginButton from './Pages/LoginButton';
// import LogoutButton from './components/LogoutButton';
import Calendar from './components/calendar';
import Calc2 from './components/Calc2';
import Attributes, { Attribute } from './Pages/Attribute';
// import Calendar from './Pages/Calendar';
import Products from './Pages/Products';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Pages/Login'
import Register from './Pages/Register'
import { FaCalendar } from 'react-icons/fa';
class App extends React.Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Calc2} />
          <Route exact path='/calendar' component={Calendar} />
          <Route exact path='/products' component={Products} />
          <Route exact path="/log-in" component={Login} />
          <Route exact path='/sign-up' component={Register} />
        </Switch>
      </Router>
    );
  }
}

export default App;
