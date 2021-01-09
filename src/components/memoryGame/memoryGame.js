import React, { Component } from 'react';
import MemoryBoard from './memoryBoard';
import '../../css/memoryGame.css';

export default class MemoryGame extends Component {

    constructor(props){
        super(props);
        this.state = {
            array: this.shuffle([
                {value: 1,
                matched: false,
            flipped: false},
            {value: 1,
                matched: false,
            flipped: false},
            {value: 2,
                matched: false,
            flipped: false},
            {value: 2,
                matched: false,
            flipped: false},
            {value: 3,
                matched: false,
            flipped: false},
            {value: 3,
                matched: false,
            flipped: false},
            {value: 4,
                matched: false,
            flipped: false},
            {value: 4,
                matched: false,
            flipped: false},
            {value: 5,
                matched: false,
            flipped: false},
            {value: 5,
                matched: false,
            flipped: false},
            {value: 6,
                matched: false,
            flipped: false},
            {value: 6,
                matched: false,
            flipped: false}]),
           
            previousObjIndex: undefined,
            totalMatches: 0,
            totalTry: 0,
            gameComplete: false
        }

        //this.shuffle();
        this.checkIfMatch = this.checkIfMatch.bind(this);
        this.replay = this.replay.bind(this);
    }

    shuffle(array) {
        
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }

      checkIfMatch(index){
          var array2 = this.state.array;
          array2[index].flipped = true;
          var previousObjIndex = this.state.previousObjIndex;
          var totalMatches = this.state.totalMatches;
          var totalTry = this.state.totalTry + 1;
          if(previousObjIndex !== undefined){
              if(array2[previousObjIndex].value === array2[index].value ){
                  array2[previousObjIndex].matched = true;
                  array2[index].matched = true;
                  totalMatches++;
                  this.setState({previousObjIndex: undefined, totalMatches: totalMatches, array: array2});
              }else{
                  var _this = this;
                  setTimeout(function(){
                    array2[previousObjIndex].flipped = false;
                    array2[index].flipped = false;
                        _this.setState({previousObjIndex: undefined, array: array2});
                  },600);
                  
              }

          }else{
            this.setState({previousObjIndex: index, array: array2});
          }

          if(totalMatches === this.state.array.length/2){
            this.setState({gameComplete: true});
          }

          this.setState({array: array2, totalTry: totalTry});
      }


      replay(){
          this.setState({
            array: this.shuffle([
                {value: 1,
                matched: false,
            flipped: false},
            {value: 1,
                matched: false,
            flipped: false},
            {value: 2,
                matched: false,
            flipped: false},
            {value: 2,
                matched: false,
            flipped: false},
            {value: 3,
                matched: false,
            flipped: false},
            {value: 3,
                matched: false,
            flipped: false},
            {value: 4,
                matched: false,
            flipped: false},
            {value: 4,
                matched: false,
            flipped: false},
            {value: 5,
                matched: false,
            flipped: false},
            {value: 5,
                matched: false,
            flipped: false},
            {value: 6,
                matched: false,
            flipped: false},
            {value: 6,
                matched: false,
            flipped: false}]),
           
            previousObjIndex: undefined,
            totalMatches: 0,
            totalTry: 0,
            gameComplete: false
        });          
      }
  

    
      render() {
      return (
        <div className="bodyContainer">
            
            <h1 className="leftAlign">Memory Game</h1>
            <center><b>Go ahead.. Find the matching cards in the least possible tries!</b></center>
            {this.state.gameComplete ? <div className="congrats"> Yayy you matched everything in {this.state.totalTry} tries! <br/>
            Your efficiency is {Math.round((12/this.state.totalTry*100)*10 )/10}% </div> : null}
            {this.state.gameComplete ? <button className="btn btn-primary" onClick={this.replay}> Replay </button> : null}
            <div className="mainGame">          
                <div>
                    <MemoryBoard squares={this.state.array}
                    onClick = {this.checkIfMatch} />
                </div>
          </div>
         
        </div>
      );
    }
  }