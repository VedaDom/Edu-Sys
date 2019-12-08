import React, { Component } from 'react'
import './Login.css';
import Intersect from '../../assets/Intersect.svg'
import logo from '../../assets/logo.svg'
import { InputField } from '../core/InputField/InputField'
import { Button } from "../core/Button/Button"
import { Redirect } from "react-router";
import app from '../../base';
import { connect } from 'react-redux';
import { SET_CURRENT_USER } from '../../redux/actions/types'

export class Login extends Component {

    state = {
        email: '',
        password: ''
    }

    handleLogin = async () => {

        let userCredential;
        try {
            userCredential = await app
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password);

            const userData = await app.firestore().collection('users').doc(userCredential.user.uid).get();
            
            const user = {
                id: userData.get('id'),
                firstname: userData.get('firstname'),
                lastname: userData.get('lastname'),
                email: userData.get('email'),
                type: userData.get('type')
            }
            this.props.dispatch({
                type: SET_CURRENT_USER,
                payload: user
            });
            
        } catch (error) {
            alert(error);
        }
    }

    render()  {
        if (this.props.user.id) {
            return <Redirect to='/' />
        }
        return (
            <div className="login">
                <div className="logo-container">
                    <img src={logo} />
                    <div className="label">Education is the passport to the future, for tomorrow belongs to those who prepare for it today.</div>
                </div>
                <div className="login--form-container">
                    <img src={Intersect} className="login--intersect" />
                    <div className="login--label">Login</div>
                    <div className="form">
                        <InputField label="Email" type="email" onChange={(e) => { this.setState({email: e.target.value}); }} />
                        <div style={{ paddingBottom: 32 }}></div>
                        <InputField label="Password" type="password" onChange={(e) => { this.setState({password: e.target.value}); }} />
                        <div style={{ paddingBottom: 32 }}></div>

                        <div style={{ paddingBottom: 42 }}></div>
                        <Button onClick={() => this.handleLogin()} text="Login" />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.users.user
});

export default connect(mapStateToProps, null)(Login);
