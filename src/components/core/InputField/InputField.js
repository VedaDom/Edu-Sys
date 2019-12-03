import React, { Component } from 'react'
import './InputField.css'

export class InputField extends Component {
    render() {
        return (
            <div className="input-field">
                <div className="input-field--label">{this.props.label}</div>
                <input value={this.props.value} onChange={this.props.onChange} type={this.props.type} className="input-field--input" />
            </div>
        )
    }
}

export default InputField
