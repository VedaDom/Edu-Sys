import React, { Component } from 'react'

export class InputField extends Component {
    render() {
        return (
            <div className="input-field">
                <div className="input-field--label">{this.props.label}</div>
                <input id={this.props.id} type={this.props.type} className="input-field--input" />
            </div>
        )
    }
}

export default InputField
