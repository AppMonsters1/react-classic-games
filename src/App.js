import React, { Component } from 'react';
import './App.css';
import Header from './header';
import Routes from './routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Routes/>
        <footer>
          <strong> Developed By:Shamith. | {(new Date().getFullYear()).toString()}</strong>
        </footer>
      </div>
    );
  }
}

export default App;
