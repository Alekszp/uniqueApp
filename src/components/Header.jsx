import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Navbar, NavItem, Icon, Button } from 'react-materialize';
import axios from "axios";

class Header extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    }
    logOut() {
        this.props.logOut();

    }

    render() {
        let { user } = this.props;
        console.log(user);
        return (
            <Navbar right className="grey-text blue-grey darken-3">
                <NavItem onClick={() => console.log('test click')}>Find slave</NavItem>
                <NavItem href='components.html'>Find master</NavItem>
                <NavItem className='navbarPhotoItem'><label>{user.firstName}</label></NavItem>
                <NavItem href='#' className='navbarPhotoItem'>
                    <Link to='/ProfileSettings'>
                        <img className='userProfileMenuPhoto' src='http://cdn.facesofopensource.com/wp-content/uploads/2016/04/23071530/faces.bdalegarbee16558.web_.jpg' />
                    </Link>

                </NavItem>
                <NavItem href='#' className='logoutBtn'>
                    <Link onClick={this.logOut} to='/login' >
                        <Icon>exit_to_app</Icon>
                    </Link>
                </NavItem>
            </Navbar>
        )
    }
}

export default Header;