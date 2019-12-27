import React, { Component } from 'react';
import './App.css';
import Login from './login/LoginForm';
import Books from './Bookdata';

class App extends Component {
 
  render() {
    return (
      <div>
        <h1>BCV E-LIBRARY APPLICATION</h1>
            
            <Login />
      </div>
    )
    
  }
  
}
export default App;
