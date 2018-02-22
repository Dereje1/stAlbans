"use strict" //menu bar
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Nav, NavItem, Navbar, Button} from 'react-bootstrap';

import {setGuest} from '../actions/authentication'//sets fake guest account

class Menu extends Component {
  constructor(props) {
    super(props);
  }

  handleLogin(){//twitter authentication
    window.location="/auth/twitter"
  }

  render() {
    if(!this.props.user.user.authenticated){//for non authenticated users
        return (
          <Navbar fixedTop>
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="/">stAlbans</a>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                  <Nav pullRight activeKey={1}>
                    <NavItem eventKey={5} href="/auth/twitter">Login with Twitter</NavItem>
                  </Nav>
              </Navbar.Collapse>
         </Navbar>
        );
    }
    else{//for twitter authenticated users
      return(
        <Navbar fixedTop>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">stAlbans</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullRight activeKey={1}>
                  <NavItem eventKey={2} href="/">Home</NavItem>
                  <NavItem eventKey={5} href="/logout">Logout {this.props.user.user.displayname.split(' ')[0]}</NavItem>
                </Nav>
            </Navbar.Collapse>
       </Navbar>
      )
    }

  }

}

function mapStateToProps(state){
  return state
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
          setGuest:setGuest
          }, dispatch)
}
//only reads store state does not write to it
export default connect(mapStateToProps,mapDispatchToProps)(Menu)
