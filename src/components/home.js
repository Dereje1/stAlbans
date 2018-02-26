"use strict"//homepage for both logged in and guest users
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Button,DropdownButton,ButtonToolbar,MenuItem,Accordion, Panel,Well} from 'react-bootstrap'
import axios from 'axios'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fulldb:"",
      animals:[],
      selectedClass:"Select Class",
      selectedStudent:""
    };
  }
  componentDidMount() {
    axios.get('/dbmodel').then((response)=>{
      if(typeof(response.data)=="string"){return;}
      let allAnimals = Object.keys(response.data).filter((animal)=>{
        return (animal!=="_id")
      })
      this.setState({
        fulldb:response.data,
        animals:allAnimals
      })
    })
  }

  viewDBModel(){
    window.open("/dbmodel",'_blank')
  }
  populateAnimals(){
    if(!this.state.animals){return null}

    let formattedAnimals = this.state.animals.map((animal,idx)=>{
      return(<MenuItem key={idx} eventKey={idx}>{animal}</MenuItem>)
    })
    return formattedAnimals
  }
  selectClass(e){
    this.setState({
      selectedClass:this.state.animals[e],
      selectedStudent:""
    })
  }
  groupClick(){
  }
  expandClass(){
    if(this.state.selectedClass==="Select Class"){
      return null
    }
    let fullClass = this.state.fulldb[this.state.selectedClass]

    let formattedClasses= fullClass.map((c,idx)=>{
      let head = c.group  + "\n"  + c.room + "\n" + "Total " + c.students.length  + "\n" + "Max " + c.maximum
      return(
        <Accordion key={"acc"+idx} className="accord" onClick={()=>this.groupClick()}>
          <Panel className="panel"  header={head} eventKey={1} >
            {this.expandStudents(c.students)}
          </Panel>
        </Accordion>
      )
    })

    return(<div className="groups">{formattedClasses}</div>)
  }
  expandStudents(students){
    let formattedStudents = students.map((s,idx)=>{
      return(
              <ul key={idx} className="list-group">
                <span className="studentbox" onClick={()=>this.setState({selectedStudent:s})}>{s.name}</span>
              </ul>
            )
      })
    return formattedStudents
  }
  displayStudent(){
    if(!this.state.selectedStudent){return null}
    return(
      <div className="studentdisplay">
        <div className="name">{this.state.selectedStudent.name}</div>
        <div className="dob">DOB: {this.state.selectedStudent.dob}</div>
        <div className="Parent1">Parent 1:{this.state.selectedStudent.parent1}</div>
        <div className="Parent2">Parent 2:{this.state.selectedStudent.parent2}</div>
        <div className="enrollment">Enrolled:{this.state.selectedStudent.enrollment}</div>
      </div>
    )
  }
  render() {
  //render nothing if no guest or authenticated status
  let userStatus = (this.props.user.user.username===null) ? false : true

  if (userStatus){
    return (
        <div className="mainbox">
          <div className="headerbox">
            <DropdownButton bsSize="large" title={this.state.selectedClass} id="dropdown-size-large" onSelect={(e)=>this.selectClass(e)}>
              {this.populateAnimals()}
            </DropdownButton>
            <Button onClick={this.viewDBModel}> View Raw DB Model </Button>
          </div>
          <div className="datadisplay">
            {this.expandClass()}
            {this.displayStudent()}
          </div>

        </div>
        );
  }
  else{
    return (null);
  }

  }
}

function mapStateToProps(state){
  return state
}
export default connect(mapStateToProps)(Home)
