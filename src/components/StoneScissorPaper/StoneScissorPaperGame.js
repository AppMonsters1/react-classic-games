import React, { Component } from 'react';
//import classnames from 'classnames';

export default class StoneScissorPaperGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: undefined,
            result: undefined
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        var userVal = e;
        console.log(e);
        var _this = this;
        var ssp = ['Stone', 'Scissor', 'Paper'];
        this.setState({ value: undefined })
        var rand = ssp[Math.floor(Math.random() * ssp.length)];
        setTimeout(function () {
            _this.setState({ value: rand });
            var didUserWin = _this.userWins(userVal, rand);
            if (didUserWin === true) {
                _this.setState({ result: "You won!" });
            } else if (didUserWin === false) {
                _this.setState({ result: "You lost!" });
            } else {
                _this.setState({ result: "It's a tie!" })
            }
        }, 5);
    }

    userWins(userVal, randVal) {
        switch (userVal) {
            case "Stone":
                switch (randVal) {
                    case "Stone":
                        return null;
                    case "Scissor":
                        return true;
                    case "Paper":
                        return false;
                    default: return false;
                }
            case "Scissor":
                switch (randVal) {
                    case "Stone":
                        return false;
                    case "Scissor":
                        return null;
                    case "Paper":
                        return true;
                    default: return false;

                }

            case "Paper":
                switch (randVal) {
                    case "Stone":
                        return true;
                    case "Scissor":
                        return false;
                    case "Paper":
                        return null;
                        default: return false;
                    }
            default:
                return null;
        }
    }

    render() {

        return (
            <div className="bodyContainer">
                 {!sessionStorage.getItem('isUserLoggedIn')?  this.props.history.push('/react-classic-games/login'):null}//
                <h1 className="leftAlign">Stone Scissor Paper</h1>
                <div>
                    <strong>Play this fun game of Stone, Scissor, Paper with the bot!</strong>
                </div>
                <br/>
                <div className="buttons">
                    <button className="btn btn-default buttons" onClick={() => this.handleClick('Stone')} id="Stone">
                        <img src={require('../../images/stone.png')} alt="Stone" width="80" height="80" className="images"/><br />
                        Stone </button>
                    <button className="btn btn-default buttons" onClick={() => this.handleClick('Scissor')} id="Scissor">
                        <img src={require('../../images/scissor.png')} alt="Scissor" width="80" height="80" className="images"/><br />
                        Scissor </button>
                    <button className="btn btn-default buttons" onClick={() => this.handleClick('Paper')} id="Paper">
                        <img src={require('../../images/paper.png')} alt="Paper" width="80" height="80" className="images"/><br />
                        Paper </button>
                </div>
                
                <img src={require('../../images/bot.png')} alt="Paper" width="90" height="90" className="images"/>
                <b>Bot Chooses:</b>
                {this.state.value === 'Stone' ?
                    <button className="btn btn-default buttons" id="StoneAns" disabled={true}>
                        <img src={require('../../images/stone.png')} alt="Stone" width="80" height="80" className="images"/><br />
                        Stone </button> :
                    this.state.value === 'Scissor' ?
                        <button className="btn btn-default buttons" id="ScissorAns" disabled={true}>
                            <img src={require('../../images/scissor.png')} alt="Scissor" width="80" height="80" className="images"/><br />
                            Scissor </button> :
                    this.state.value === 'Paper' ?
                        <button className="btn btn-default buttons" id="PaperAns" disabled={true}>
                            <img src={require('../../images/paper.png')} alt="Paper" width="80" height="80" className="images"/><br />
                            Paper </button> :
                            <div style={{display: 'inline-block', width: '82px', height: '82px'}} className="images"></div>
                }

                <br />
                {this.state.result ?
                    <span className="result">
                    {this.state.result}</span> : null}
                
                <br />

            </div>
        );
    }
}
