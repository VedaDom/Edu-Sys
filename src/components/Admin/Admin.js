import React, { Component } from 'react'
import './Admin.css'
import logo from "../../assets/logo.svg";
import { InputField } from "../core/InputField/InputField";
import { Button } from "../core/Button/Button";
import app from '../../base';

export class Admin extends Component {
    
    state = {
        isAddModelOpen: false,
        isViewSchool: false,
        schools: [],
        isloaded: false,
        search: '',
        schoolNames: '',
        schoolType: 'School',
        schoolEmail: '',
        schoolLocation: '',
        schoolPassword: '',
        selectedIdex: -1
    }

    closeAddModel = () => {
        this.setState({isAddModelOpen: false, isViewSchool: false});
    }

    loadSchools = () => {
        app.firestore().collection('schools').onSnapshot((snapshot) => {
            let schools = this.state.schools;
            snapshot.docChanges().map(doc => {
                const school = {
                    id: doc.doc.get('id'),
                    names: doc.doc.get('names'),
                    type: doc.doc.get('type'),
                    email: doc.doc.get('email'),
                    location: doc.doc.get('location'),
                }
                schools.push(school);
            });
            this.setState({schools: schools, isloaded: true});
        });
    }

    saveSchool = async () => {
        const userCredential = await app.auth().createUserWithEmailAndPassword(this.state.schoolEmail, this.state.schoolPassword);
        app.firestore().collection('users').doc(userCredential.user.uid).set({
            id: userCredential.user.uid,
            firstname: 'Admin',
            lastname: '',
            email: this.state.schoolEmail,
            type: 'School'
        });
        app.firestore().collection('schools').doc(userCredential.user.uid).set({
            id: userCredential.user.uid,
            names: this.state.schoolNames,
            type: this.state.schoolType,
            email: this.state.schoolEmail,
            location: this.state.schoolLocation
        });
        this.closeAddModel();
    }

    render() {
        if (!this.state.isloaded) {
            this.loadSchools();
        }
        return (
            <div className="container">
                <div className="admin">
                    <div className="admin--side-bar">
                        <div className="admin--side-bar--header">
                            <img src={logo} />
                            {/* <div style={{ paddingBottom: 16 }}></div> */}
                        </div>
                        <div className="nav-items">
                            <div className="nav-item active">
                                <div className="nav-item-icon"></div>
                                <div className="nav-item-text">Schools</div>
                            </div>
                            <div className="nav-item">
                                <div className="nav-item-icon"></div>
                                <div className="nav-item-text">Settings</div>
                            </div>
                        </div>
                    </div>
                    <div className="admin--content">
                        <div className="app-bar">
                            <div className="search">
                                <input name="seach" className="input-field-input" type="search" placeholder="Search..." onChange={(e) => {this.setState({search: e.target.value})}}/>
                            </div>
                            <div className="avatar-container">
                                <div className="avatar"></div>
                            </div>
                        </div>
                        <div style={{ paddingBottom: 48 }}></div>
                        <div className="user-table">
                            <div className="table">
                                <div className="trow-h">
                                    <div className="trow-item border-r">Names</div>
                                    <div className="trow-item border-r">Email</div>
                                    <div className="trow-item">Type</div>
                                </div>
                                <div className="trows-s">
                                    {
                                        this.state.schools.map((school, index) => {
                                            if (this.state.search.length > 0 && school.names.includes(this.state.search)) {
                                                return (
                                                    <div onClick={() => {this.setState({isViewSchool: true, isAddModelOpen: true, selectedIdex: index})}} key={index} className="trow">
                                                        <div className="trow-item border-r">{school.names}</div>
                                                        <div className="trow-item border-r">{school.email}</div>
                                                        <div className="trow-item">{school.type}</div>
                                                    </div>
                                                );
                                            }
                                            else if(this.state.search.length == 0){
                                                return (
                                                    <div onClick={() => {this.setState({isViewSchool: true, isAddModelOpen: true, selectedIdex: index})}} key={index} className="trow">
                                                        <div className="trow-item border-r">{school.names}</div>
                                                        <div className="trow-item border-r">{school.email}</div>
                                                        <div className="trow-item">{school.type}</div>
                                                    </div>
                                                );
                                            }
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => {this.setState({
                        isAddModelOpen: true,
                        schoolNames: '',
                        schoolType: 'School',
                        schoolEmail: '',
                        schoolLocation: '',
                        schoolPassword: '',
                    })}} className="add-user"></div>
                </div>
                <div style={{display: this.state.isAddModelOpen ? 'grid' : 'none'}} className="model-add-user">
                    <div className="model">
                        <div className="top">
                            <div style={{display: !this.state.isViewSchool ? 'block' : 'none'}} className="model-title">Register new school</div>
                            <div style={{display: this.state.isViewSchool ? 'block' : 'none'}} className="user-avatar"></div>
                        </div>
                        <div style={{ paddingBottom: 64 }}></div>
                        <div className="middle">
                            <InputField value={this.state.isViewSchool ? this.state.schools[this.state.selectedIdex].names : this.state.schoolNames} label="School name" type="text" onChange={(e)=>{this.setState({schoolNames: e.target.value})}}/>
                            <InputField value={this.state.isViewSchool ? this.state.schools[this.state.selectedIdex].location : this.state.schoolLocation} label="School location" type="text" onChange={(e)=>{this.setState({schoolLocation: e.target.value})}}/>
                            <InputField value={this.state.isViewSchool ? this.state.schools[this.state.selectedIdex].type : this.state.schoolType} label="Type" type="text" onChange={(e)=>{this.setState({schoolType: e.target.value})}}/>
                            <div className="email"><InputField value={this.state.isViewSchool ? this.state.schools[this.state.selectedIdex].email : this.state.schoolEmail} label="School email" type="email" onChange={(e)=>{this.setState({schoolEmail: e.target.value})}}/></div>
                            <InputField label="Admin password" type="password" onChange={(e)=>{this.setState({schoolPassword: e.target.value})}}/>
                        </div>
                        <div style={{ paddingBottom: this.state.isViewSchool ? 250 : 325}}></div>
                        <div className="bottom">
                            <Button onClick={this.closeAddModel} style={"#E5E5E5"} text="Cancel"/>
                            <Button onClick={this.saveSchool} style={"#00BA82"} text="Submit"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Admin;
