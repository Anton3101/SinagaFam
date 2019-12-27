import React , { Component } from 'react';
import { Form, Button, Dropdown, Input, } from 'semantic-ui-react';
import {  BrowserRouter as Router, Route, Redirect, BrowserRouter, withRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
import Books from '../books/Bookdata';

export default class LoginForm extends Component {
  
  constructor(props){
    super(props);
      this.state={
        username:'',
        password:'',
        redirect: false,
      }
      this.handleLogin = this.handleLogin.bind(this);
      
  }   

  submitForm = (e) => {
    e.preventDefault();
    
    this.props.handleData(this.state)
  } 

  changeHandler = (e) => {
     this.setState({ [e.target.name] : e.target.value })
  }

 handleLogin = async (event) =>{
      event.preventDefault();
      this.setState({
          redirect: true
        });
      let data = {"user": this.state.username, "password": this.state.password}
      const self = this;
      await fetch('http://localhost:4000/login', {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{ "Content-Type": "application/json" }
      })
      .then(res => res.json())
      .catch(error => console.error("Error : ", error))
      .then(responseJson => {
          self.setState(responseJson);
          const returnObj = responseJson;
          //sessionStorage.setItem('resData', JSON.stringify(returnObj));
      });

}
render() {
     console.log('render : ', this.state);
     if(this.state.redirect){
        return ( 
            <BrowserRouter>
                <div>
                    <Route path="../books/Bookdata" component={Books} />
                </div>
            </BrowserRouter>
        )
     }
     else{
        return(
            <form>
                <div className="container">
                    <div className="row">
                        <div className="col"><label>User Name</label></div>
                        <div className="col"><input type="text" id="username" name="username"  value={this.username} placeholder="enter you username"  onChange={this.changeHandler} /></div>
                    </div>
                    <div className="row">
                        <div className="col"><label>Password</label></div>
                        <div className="col"><input type="text" id="password" name="password"  value={this.password} placeholder="enter password" onChange={this.changeHandler} /></div>
                    </div>
                    <div className="row">
                        <div className="col"><input type="checkbox" label="Remember" /></div> 
                        <div className="col"><a href="#" style={{float:'right', marginTop:-23}}>Forgot Password?</a></div>
                    </div>
                    <button 
                        type="button" size="lg" onClick={this.handleLogin}>
                        Login
                    </button>
                </div>
                <br />
                <div id="error"></div>
                <div className="clear-fix"></div>
                <hr/>
            </form>   

        )
     }
      
   }
}
