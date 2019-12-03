import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router";
import Users from '../Users/Users'
import School from '../School/School'
import Admin from '../Admin/Admin'
import './Home.css'

export class Home extends Component {
    render() {
        if (!this.props.user.id) {
            return <Redirect to="/login" />;
        }

        return (
            <div className='home-container'>
                <div className='home' style={{ display: this.props.user.type === 'Admin' ? 'block' : 'none' }}>
                    <Admin />
                </div>
                <div className='home' style={{ display: this.props.user.type === 'Student' ? 'block' : 'none' }}>
                    <Users />
                </div>
                <div className='home' style={{ display: this.props.user.type === 'Parent' ? 'block' : 'none' }}>
                    <Users />
                </div>
                <div className='home' style={{ display: this.props.user.type === 'School' ? 'block' : 'none' }}>
                    <School />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.users.user
});

export default connect(mapStateToProps)(Home);
