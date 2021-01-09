import React, { Component } from 'react';
import {Jumbotron } from 'react-bootstrap';
import {Link} from 'react-router-dom';

class Home extends Component {
    render() {
      return (
        <div className="bodyContainer" >
            <Jumbotron className="" style={{borderRadius:50,padding:20}}>
                <h1>Welcome to GameStop!</h1>
                <p>
                    This application demostrates the use of react-router-dom with some simple games.
                    <br/><br/>
                    Please enjoy some classic games from the menu above and login to access more!
                    <br/><br/>
                    <Link to="/react-classic-games/login" className="btn btn-success"> 
                    <span className="glyphicon glyphicon-log-in"></span> Login</Link>
                </p>
                <p>
                </p>
            </Jumbotron>
        </div>
      );
    }
  }
  
  export default Home;