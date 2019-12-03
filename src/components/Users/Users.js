import React, { Component } from 'react'
import './Users.css'
import logo from "../../assets/logo.svg";
import { connect } from 'react-redux';

export class Users extends Component {

    state = {
        isReportModelOpen: false,
    }

    closeReportModel = () => {
        this.setState({isReportModelOpen: false});
    }

    render() {
        return (
            <div className="container">
                <div className="users">
                    <div className="users--side-bar">
                        <div className="users--side-bar--header">
                            <img src={logo} />
                            <div style={{ paddingBottom: 16 }}></div>
                            <div className="users-logo"></div>
                            <div className="label-u">{this.props.user.firstname +' '+ this.props.user.lastname}</div>
                            <div style={{fontSize: 12}} className="label-u">{this.props.user.email}</div>
                        </div>
                        <div className="nav-items">
                            <div className="nav-item active">
                                <div className="nav-item-icon"></div>
                                <div className="nav-item-text">Dashboard</div>
                            </div>
                            <div className="nav-item">
                                <div className="nav-item-icon"></div>
                                <div className="nav-item-text">Settings</div>
                            </div>
                        </div>
                    </div>
                    <div className="users--content">
                        <div className="users-reports">
                            <div className="user-report">
                                <div className="l-top">
                                    <div className="l-top-lt">
                                        <div className="label-l">Level 1</div>
                                        <div style={{ paddingBottom: 16 }}></div>
                                        <div className="label-t">Business</div>
                                        <div style={{ paddingBottom: 8 }}></div>
                                        <div className="label-t">CBE</div>
                                    </div>
                                    <div className="l-top-rt">
                                        <div className="average">80%</div>
                                    </div>
                                </div>
                                <div style={{ paddingBottom: 16 }}></div>
                                <div className="l-bottom">
                                    <div className="l-progress">
                                        <div onClick={() => {this.setState({isReportModelOpen: true})}} className="circle completed"></div>
                                        <div className="line-circle">
                                            <div className="line"></div>
                                            <div className="circle"></div>
                                        </div>
                                        <div className="line-circle">
                                            <div className="line"></div>
                                            <div className="circle"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{display: this.state.isReportModelOpen ? 'grid' : 'none'}} className="model-report">
                    <div className="model-r">
                        <div className="h-title">
                            <div className="title">{'Marks Report'.toUpperCase()}</div>
                            <div className="s-name">{'Mark College'.toUpperCase()}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.users.user
});
 
export default connect(mapStateToProps)(Users);
