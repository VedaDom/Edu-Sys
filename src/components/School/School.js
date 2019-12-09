import React, { Component } from 'react'
import './School.css'
import logo from "../../assets/logo.svg";
import { InputField } from "../core/InputField/InputField";
import { Button } from "../core/Button/Button";
import app from '../../base';
import { connect } from 'react-redux';

export class School extends Component {

    state = {
        isAddModelOpen: false,
        isViewUser: false,
        users: [],
        isloaded: false,
        search: '',
        selectedIdex: -1,
        firstname: '',
        lastname: '',
        type: 'Student',
        email: '',
        password: '',
        location: '',
        activeSearch: 'all',

        pfirstname: '',
        plastname: '',
        pemail: '',
        ppassword: '',
        ptype: 'Parent',
        plocation: '',
    }

    closeAddModel = () => {
        this.setState({ isAddModelOpen: false, isViewUser: false });
    }

    saveUser = async () => {
        const userCredential = await app.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
        await app.firestore().collection('users').doc(userCredential.user.uid).set({
            id: userCredential.user.uid,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            type: this.state.type,
            schoolId: this.props.user.id,
            pfirstname: this.state.pfirstname,
            plastname: this.state.plastname,
            pemail: this.state.pemail,
            plocation: this.state.plocation,
        });
        const puserCredential = await app.auth().createUserWithEmailAndPassword(this.state.pemail, this.state.ppassword);
        await app.firestore().collection('users').doc(puserCredential.user.uid).set({
            id: puserCredential.user.uid,
            pfirstname: this.state.pfirstname,
            plastname: this.state.plastname,
            pemail: this.state.pemail,
            ptype: 'Parent',
            plocation: this.state.plocation,
        });
        this.closeAddModel();
    }

    deleteUser = () => {
        app.firestore().collection('users').doc(this.state.users[this.state.selectedIdex].id).delete();
        this.closeAddModel();
    }

    loadUsers = () => {
        app.firestore().collection('users').where('schoolId','==', this.props.user.id).onSnapshot((snapshot) => {
            let users = this.state.users;
            snapshot.docChanges().map(doc => {
                if (doc.type === 'added') {
                    const user = {
                        id: doc.doc.get('id'),
                        firstname: doc.doc.get('firstname'),
                        lastname: doc.doc.get('lastname'),
                        type: doc.doc.get('type'),
                        email: doc.doc.get('email'),
                        location: doc.doc.get('location'),
                        pfirstname: doc.doc.get('pfirstname'),
                        plastname: doc.doc.get('plastname'),
                        pemail: doc.doc.get('pemail'),
                        ppassword: doc.doc.get('ppassword'),
                        ptype: doc.doc.get('ptype'),
                        plocation: doc.doc.get('plocation'),
                    }
                    users.push(user);
                }
                else if (doc.type === 'removed') {
                    const index = users.findIndex(i => i.id === doc.doc.get('id'));
                    users.splice(index, 1);
                }
            });
            this.setState({users: users, isloaded: true});
        });
    }

    render() {
        if (!this.state.isloaded) {
            this.loadUsers();
        }
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
                        <div className="app-bar-s">
                            <div className="search-s">
                                <input className="input-field-input-s" placeholder="Search..." onChange={(e) => {this.setState({search: e.target.value})}}/>
                                <div className="search-options-s">
                                    <div onClick={() => {this.setState({activeSearch: 'all'})}} style={this.state.activeSearch === "all" ? {color: '#00BA82'} : {color: 'black'}} className="option side">All</div>
                                    <div onClick={() => {this.setState({activeSearch: 'lectures'})}} style={this.state.activeSearch === "lectures" ? {color: '#00BA82'} : {color: 'black'}} className="option">Lectures</div>
                                    <div onClick={() => {this.setState({activeSearch: 'students'})}} style={this.state.activeSearch === "students" ? {color: '#00BA82'} : {color: 'black'}} className="option side">Students</div>
                                </div>
                            </div>
                            <div className="avatar-container-s">
                                <div className="avatar-s"></div>
                            </div>
                        </div>
                        <div style={{ paddingBottom: 48 }}></div>
                        <div className="user-table">
                            <div className="table">
                                <div className="trow-h-s">
                                    <div className="trow-item border-r">Names</div>
                                    <div className="trow-item border-r">Email</div>
                                    <div className="trow-item">Type</div>
                                </div>
                                <div className="trows-s">
                                    {
                                        this.state.users.map((user, index) => {
                                            if (this.state.search.length > 0 && user.firstname.toLowerCase().includes(this.state.search.toLowerCase()) || user.lastname.toLowerCase().includes(this.state.search.toLowerCase()) || user.type.toLowerCase().includes(this.state.search.toLowerCase())) {
                                                return (
                                                    <div onClick={() => { this.setState({ isViewUser: true, isAddModelOpen: true, selectedIdex: index}) }} key={index} className="trow-s">
                                                        <div className="trow-item border-r">{user.firstname +' '+ user.lastname}</div>
                                                        <div className="trow-item border-r">{user.email}</div>
                                                        <div className="trow-item">{user.type}</div>
                                                    </div>
                                                );
                                            }
                                            else if(this.state.search.length == 0){
                                                return (
                                                    <div onClick={() => { this.setState({ isViewUser: true, isAddModelOpen: true }) }} key={index} className="trow-s">
                                                        <div className="trow-item border-r">{user.firstname +' '+ user.lastname}</div>
                                                        <div className="trow-item border-r">{user.email}</div>
                                                        <div className="trow-item">{user.type}</div>
                                                    </div>
                                                );
                                            }
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => { this.setState({ isAddModelOpen: true }) }} className="add-user">+</div>
                </div>
                <div style={{ display: this.state.isAddModelOpen ? 'grid' : 'none' }} className="model-add-user">
                    <div className="model">
                        <div className="top">
                            <div style={{ display: !this.state.isViewUser ? 'block' : 'none' }} className="model-title">Register new user</div>
                            <div style={{ display: this.state.isViewUser ? 'block' : 'none' }} className="user-avatar"></div>
                        </div>
                        <div style={{ paddingBottom: 64 }}></div>
                        <div style={{ height: this.state.isViewUser ? 380 : 452 }} className="middle-s">
                            <div className="student-info-s">
                                <InputField value={this.state.isViewUser ? (this.state.users[this.state.selectedIdex].firstname +" "+ this.state.users[this.state.selectedIdex].firstname) : this.state.firstname} label="First name" type="text" onChange={(e)=>{this.setState({firstname: e.target.value})}}/>
                                <InputField value={this.state.isViewUser ? this.state.users[this.state.selectedIdex].lastname : this.state.lastname} label="Last name" type="text" onChange={(e)=>{this.setState({lastname: e.target.value})}}/>
                                <InputField value={this.state.isViewUser ? this.state.users[this.state.selectedIdex].type : this.state.schoolType} label="Type" type="text" onChange={(e)=>{this.setState({type: e.target.value})}}/>
                                <div className="email"><InputField value={this.state.isViewUser ? this.state.users[this.state.selectedIdex].email : this.state.email} label="Email" type="email" onChange={(e)=>{this.setState({email: e.target.value})}}/></div>
                                <div style={{ display: this.state.isViewUser ? 'none' : 'block' }}><InputField label="Password" type="password" onChange={(e)=>{this.setState({password: e.target.value})}}/></div>
                            </div>
                            <div style={{ paddingBottom: 48 }}></div>
                            <div style={{fontSize: 28}} className="input-field--label">Parent info</div>
                            <div style={{ paddingBottom: 16 }}></div>
                            <div className="parent-info-s">
                                <InputField value={this.state.isViewUser ? (this.state.users[this.state.selectedIdex].pfirstname +" "+ this.state.users[this.state.selectedIdex].pfirstname) : this.state.pfirstname} label="First name" type="text" onChange={(e)=>{this.setState({pfirstname: e.target.value})}}/>
                                <InputField value={this.state.isViewUser ? this.state.users[this.state.selectedIdex].plastname : this.state.plastname} label="Last name" type="text" onChange={(e)=>{this.setState({plastname: e.target.value})}}/>
                                <InputField value={this.state.isViewUser ? this.state.users[this.state.selectedIdex].plocation : this.state.plocation} label="Location" type="text" onChange={(e)=>{this.setState({plocation: e.target.value})}}/>
                                <div className="email"><InputField value={this.state.isViewUser ? this.state.users[this.state.selectedIdex].pemail : this.state.pemail} label="Email" type="email" onChange={(e)=>{this.setState({pemail: e.target.value})}}/></div>
                                <div style={{ display: this.state.isViewUser ? 'none' : 'block' }}><InputField label="Password" type="password" onChange={(e)=>{this.setState({ppassword: e.target.value})}}/></div>
                            </div>
                            <div style={{ paddingBottom: 64 }}></div>


                        </div>
                        <div style={{ paddingBottom: 32 }}></div>
                        <div style={{ display: !this.state.isViewUser ? 'none' : 'grid' }} className="bottom-s">
                            <Button onClick={this.deleteUser} style={"red"} text="Delete" />
                            <Button onClick={this.closeAddModel} style={"#E5E5E5"} text="Close" />
                            <Button onClick={this.saveUser} style={"#00BA82"} text="Submit" />
                        </div>
                        <div style={{ display: this.state.isViewUser ? 'none' : 'grid' }} className="bottom-ss">
                            <Button onClick={this.closeAddModel} style={"#E5E5E5"} text="Close" />
                            <Button onClick={this.saveUser} style={"#00BA82"} text="Submit" />
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
 
export default connect(mapStateToProps)(School);
