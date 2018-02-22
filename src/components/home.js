"use strict"//homepage for both logged in and guest users
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap'


class Home extends Component {
  openDBModel(){
    window.open("/dbmodel",'_blank')
  }
  render() {
  //render nothing if no guest or authenticated status
  let userStatus = (this.props.user.user.username===null) ? false : true

  if (userStatus){
    return (
        <div className="mainbox">
          <Button onClick={this.openDBModel}> View Current DB Model </Button>
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
