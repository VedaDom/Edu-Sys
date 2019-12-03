import React, { Component } from 'react';
import './Button.css'

export class Button extends Component {
    render() {
        return <button style={{backgroundColor: this.props.style}} className="button" onClick={this.props.onClick}>{this.props.text}</button>;
    }
}

export default Button
