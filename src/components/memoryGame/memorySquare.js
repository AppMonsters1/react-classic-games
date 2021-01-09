import React, { Component } from 'react';
import classnames from 'classnames';

export default class MemorySquare extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: null
        }
        
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
      if(!this.props.item.flipped){
        this.props.onClick();
      }
    }

    render() {
      var classes = classnames(
        'square',
        'flexChild',
        {'cardFlipped' : this.props.item.flipped},
        {'cardMatched' : this.props.item.matched}
      )

      return (
        
        <button className={classes} onClick= {this.handleClick}>
         {(this.props.item.flipped || this.props.item.matched) ? <span>{this.props.item.value}</span>: <span> &#9824; </span>}
        </button>
      );
    }
  }