import React, { Component } from 'react'
import './School.css'
import logo from "../../assets/logo.svg";
import { InputField } from "../core/InputField/InputField";
import { Button } from "../core/Button/Button";

export class School extends Component {
    
    state = {
        isAddModelOpen: false,
        isViewUser: false
    }

    closeAddModel = () => {
        this.setState({isAddModelOpen: false, isViewUser: false});
    }

    render() {
        return (
            <div className="container">
                <div className="school">
                    <div className="school--side-bar">
                        <div className="school--side-bar--header">
                            <img src={logo} />
                            <div style={{ paddingBottom: 16 }}></div>
                            <div className="school-logo"></div>
                        </div>
                        <div className="nav-items">
                            <div className="nav-item active">
                                <div className="nav-item-icon"></div>
                                <div className="nav-item-text">Users</div>
                            </div>
                            <div className="nav-item">
                                <div className="nav-item-icon"></div>
                                <div className="nav-item-text">Settings</div>
                            </div>
                        </div>
                    </div>
                    <div className="school--content">
                        <div className="app-bar">
                            <div className="search">
                                <input className="input-field-input" placeholder="Search..." />
                                <div className="search-options">
                                    <div className="option side option-active">All</div>
                                    <div className="option">Lectures</div>
                                    <div className="option side">Students</div>
                                </div>
                            </div>
                            <div className="avatar-container">
                                <div className="avatar"></div>
                            </div>
                        </div>
                        <div style={{ paddingBottom: 48 }}></div>
                        <div className="user-table">
                            <div className="table">
                                <div className="trow-h">
                                    <div className="trow-item border-r">Id</div>
                                    <div className="trow-item border-r">Names</div>
                                    <div className="trow-item border-r">Email</div>
                                    <div className="trow-item">Type</div>
                                </div>
                                <div className="trows">
                                    {
                                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8].map((f, index) => {
                                            return (
                                                <div onClick={() => {this.setState({isViewUser: true, isAddModelOpen: true})}} key={index} className="trow">
                                                    <div className="trow-item border-r">2333</div>
                                                    <div className="trow-item border-r">Nsengimana Veda</div>
                                                    <div className="trow-item border-r">petter@gmail.com</div>
                                                    <div className="trow-item">Student</div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => {this.setState({isAddModelOpen: true})}} className="add-user"></div>
                </div>
                <div style={{display: this.state.isAddModelOpen ? 'grid' : 'none'}} className="model-add-user">
                    <div className="model">
                        <div className="top">
                            <div style={{display: !this.state.isViewUser ? 'block' : 'none'}} className="model-title">Register new user</div>
                            <div style={{display: this.state.isViewUser ? 'block' : 'none'}} className="user-avatar"></div>
                        </div>
                        <div style={{ paddingBottom: 64 }}></div>
                        <div className="middle">
                            <InputField label="Email" type="email" onChange={(e)=>{}}/>
                            <InputField label="Email" type="email" onChange={(e)=>{}}/>
                            <InputField label="Email" type="email" onChange={(e)=>{}}/>
                            <div className="email"><InputField label="Email" type="email" onChange={(e)=>{}}/></div>
                            <InputField label="Email" type="email" onChange={(e)=>{}}/>
                        </div>
                        <div style={{ paddingBottom: this.state.isViewUser ? 250 : 325}}></div>
                        <div className="bottom">
                            <Button onClick={this.closeAddModel} style={"#E5E5E5"} text="Cancel"/>
                            <Button onClick={this.closeAddModel} style={"#00BA82"} text="Submit"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default School;
