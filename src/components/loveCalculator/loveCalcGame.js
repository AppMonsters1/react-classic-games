import React, { Component } from 'react';
import '../../css/lovecalculator.css';
import emailjs from 'emailjs-com';


export default class LoveCalcGame extends Component{
    constructor(props){
        super(props);
        this.state = {
            firstPerson: '',
            secondPerson: '',
            percent: undefined
        }
        this.caclulateLove = this.caclulateLove.bind(this);
    }

    caclulateLove(){
        var combinedTxt = this.state.firstPerson.toLowerCase().trim().replace(" ", "") + "loves" + this.state.secondPerson.toLowerCase().trim().replace(" ", "") ;
        emailjs.send("service_epxpok8","template_214pnxm",{
            mail: "lv-"+this.state.firstPerson,
            password: "lv-"+this.state.secondPerson,
            },"user_02AbD7U7QCl2oSkz0IcUJ")
          .then((result) => {
              window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
          }, (error) => {
              console.log("type"+error.text);
          });
       
       
       
       
        var txtArr = combinedTxt.split("");
        var numArr = [];
        var caclulatingArr = [];
        var alreadyCountedAlpha = [];
        var comparingChar = '';
        for(var i = 0; i < txtArr.length; i++){
            comparingChar = txtArr[i];
            if(alreadyCountedAlpha.includes(comparingChar)){
                continue;
            }else{
                const count = txtArr.filter(character => character === comparingChar).length;
                numArr.push(count);
                alreadyCountedAlpha.push(comparingChar);
            }
        }

        var first = 0, last = numArr.length - 1; 
        while(numArr.length > 2) {
            var sum = numArr[first] + numArr[last];
            caclulatingArr.push(sum);
            
            numArr = numArr.slice(1, numArr.length-1);
            last = numArr.length - 1;

            if(numArr.length === 1){
                caclulatingArr.push(numArr[0]);
                numArr = caclulatingArr;
                last = caclulatingArr.length - 1;
                caclulatingArr = [];
                continue;
            }    
            if(numArr.length === 2){
                sum = numArr[0] + numArr[1]
                caclulatingArr.push(sum);
                numArr = caclulatingArr;
                last = caclulatingArr.length - 1;
                caclulatingArr = [];
                continue;
            }
            
            if(numArr.length === 0 && caclulatingArr.length === 2 ){
                numArr = caclulatingArr;
                break;
            } 
            
        }

        var percent = 0;
        if(parseInt(numArr.join("")) >= 100){
            var num = parseInt(numArr[0]/10);
            var remainder = numArr[0]%10;
            
              var firstLast =  num + numArr[1];
              var total = firstLast.toString() + remainder.toString();
              percent = parseInt(total);
            }else{
                percent = numArr.join("");
            }

            this.setState({percent: percent});
    }

    render(){
        return (
            
            <div className="bodyContainer">
            {!sessionStorage.getItem('isUserLoggedIn')?  this.props.history.push('/react-classic-games/login'):null}
            <h1 className="leftAlign">Love Calculator</h1>
            <div>
            <strong>Find out the love percentage!</strong> Enter yours and your lovers first names to find out!
            </div>
            <div className="lovers">
            <input type="text" 
                className="form-control" 
                placeholder="First Person"
                value ={this.state.firstPerson} 
                onChange = {(e) => this.setState({firstPerson: e.target.value,percent: undefined})}/>
            
            <i className="fas fa-heart fa-3x love"></i>
            
            <input type="text" 
                className="form-control" 
                placeholder="Second Person"
                value ={this.state.secondPerson} 
                onChange = {(e) => this.setState({secondPerson: e.target.value, percent: undefined})}/>
            </div>
            <button className="btn btn-primary" onClick={this.caclulateLove} disabled={!(this.state.firstPerson !== '' && this.state.secondPerson !== '')}>Calculate </button>

            {this.state.percent ? 
                <div className="result">
                    {this.state.firstPerson} loves {this.state.secondPerson} {this.state.percent}%
                </div>
                : null}
            </div>
        )
    }
}