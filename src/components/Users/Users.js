import React, { Component } from 'react'
import './Users.css'
import logo from "../../assets/logo.svg";
import { connect } from 'react-redux';
import app from '../../base';

export class Users extends Component {

    state = {
        isReportModelOpen: false,
        reports: [],
        isloaded: false,
        semester: 2,
        selectedSemesterMarks: [],
        student_name: '',
        student_id: '',
        school_name: ''
    }

    closeReportModel = () => {
        this.setState({isReportModelOpen: false});
    }

    loadReports = () => {
        app.firestore().collection('marks').where('user_id', '==', this.props.user.id).get().then(querySnapshot => {
            let reports = [];
            querySnapshot.docs.map(doc => {
                const report = {
                    id: doc.get('id'),
                    user_id: doc.get('user_id'),
                    user_name: doc.get('user_name'),
                    school_name: doc.get('school_name'),
                    level: doc.get('level'),
                    department: doc.get('department'),
                    semesters: doc.get('semesters'),
                    average: doc.get('average'),
                    student_id: doc.get('student_id'),
                }
                reports.push(report);
            });
            this.setState({reports: reports, isloaded: true});
        });
    }

    render() {
        if (!this.state.isloaded) {
            this.loadReports();
        }
        let testTotal = 0;
        let examTotal = 0;
        let marksTotal = 0;
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
                            {
                                this.state.reports.map((d, index) => {
                                    return (
                                        <div key={index} className="user-report">
                                            <div className="l-top">
                                                <div className="l-top-lt">
                                                    <div className="label-l">Level {d.level}</div>
                                                    <div style={{ paddingBottom: 16 }}></div>
                                                    <div className="label-t">{d.department}</div>
                                                    <div style={{ paddingBottom: 8 }}></div>
                                                    <div className="label-t">{d.school_name}</div>
                                                </div>
                                                <div className="l-top-rt">
                                                    <div className="average">{d.average}%</div>
                                                </div>
                                            </div>
                                            <div style={{ paddingBottom: 16 }}></div>
                                            <div className="l-bottom">
                                                <div className="l-progress">
                                                    <div style={d.semesters.length >= 1 ? {backgroundColor: '#00BA82', cursor: 'pointer'} : {}} onClick={d.semesters.length >= 1 ? () => {this.setState({isReportModelOpen: true, selectedSemesterMarks: d.semesters[0].marks_report, student_name: d.user_name, student_id: d.student_id, school_name: d.school_name})} : () => {}} className="circle"></div>
                                                    <div className="line-circle">
                                                        <div className="line"></div>
                                                        <div style={d.semesters.length >= 2 ? {backgroundColor: '#00BA82', cursor: 'pointer'} : {}} onClick={d.semesters.length >= 2 ? () => {this.setState({isReportModelOpen: true, selectedSemesterMarks: d.semesters[1].marks_report, student_name: d.user_name, student_id: d.student_id, school_name: d.school_name})} : () => {}} className="circle"></div>
                                                    </div>
                                                    <div className="line-circle">
                                                        <div className="line"></div>
                                                        <div style={d.semesters.length === 3 ? {backgroundColor: '#00BA82', cursor: 'pointer'} : {}} onClick={d.semesters.length === 3 ? () => {this.setState({isReportModelOpen: true, selectedSemesterMarks: d.semesters[2].marks_report, student_name: d.user_name, student_id: d.student_id, school_name: d.school_name})} : () => {}} className="circle"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div onClick={() => {this.closeReportModel()}} style={{display: this.state.isReportModelOpen ? 'grid' : 'none'}} className="model-report">
                    <div className="model-r">
                        <div className="h-title">
                            <div className="title">{'Marks Report'.toUpperCase()}</div>
                            <div className="s-name">{this.state.school_name.toUpperCase()}</div>
                        </div>
                        <div style={{ paddingBottom: 32 }}></div>
                        <div className="student-info">
                            <div className="info-row">
                                <div className="info-label">Names:</div>
                                <div className="info-value">{this.state.student_name}</div>
                            </div>
                            <div style={{ paddingBottom: 8 }}></div>
                            <div className="info-row">
                                <div className="info-label">Student Id:</div>
                                <div className="info-value">{this.state.student_id}</div>
                            </div>
                        </div>
                        <div style={{ paddingBottom: 32 }}></div>
                        <div className="m-table">
                            <div className="m-table-row border-line">
                                <div className="m-table-row-col">Course</div>
                                <div className="m-table-row-col">Marks</div>
                                <div className="m-table-row-col">Tests</div>
                                <div className="m-table-row-col">Exams</div>
                                <div className="m-table-row-col">Total</div>
                            </div>
                            <div className="m-table-rows">
                                {
                                    this.state.selectedSemesterMarks.map((item, index) => {
                                        testTotal += parseInt(item.test_marks);
                                        examTotal += parseInt(item.exam_marks);
                                        marksTotal += parseInt(item.marks);
                                        return(
                                            <div key={index} className="m-table-row border-line">
                                                <div className="m-table-row-col">{item.caurse_name}</div>
                                                <div className="m-table-row-col g-color">{item.marks}</div>
                                                <div className="m-table-row-col">{item.exam_marks}</div>
                                                <div className="m-table-row-col">{item.test_marks}</div>
                                                <div className="m-table-row-col w">{parseInt(item.test_marks) + parseInt(item.marks)}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="m-table-row border-line n-1">
                                <div className="m-table-row-col"></div>
                                <div className="m-table-row-col w g-color">{marksTotal}</div>
                                <div className="m-table-row-col w">{testTotal}</div>
                                <div className="m-table-row-col w">{examTotal}</div>
                                <div className="m-table-row-col w"></div>
                            </div>
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
