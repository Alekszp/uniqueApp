import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Navbar, NavItem, Icon } from 'react-materialize';




const header = () => (
    <Navbar fixed brand='logo' right className="grey-text blue-grey darken-3">
        <NavItem onClick={() => console.log('test click')}>Find slave</NavItem>
        <NavItem href='components.html'>Find master</NavItem>
        <NavItem href='#' className='navbarPhotoItem'>
            <Link to='/ProfileSettings'>
                <img className='userProfileMenuPhoto' src='http://cdn.facesofopensource.com/wp-content/uploads/2016/04/23071530/faces.bdalegarbee16558.web_.jpg' />
            </Link>
        </NavItem>
        <NavItem href='#' className='logoutBtn'>
            <Link to='/UnauthorizedPage'>
                <Icon>exit_to_app</Icon>
            </Link>
        </NavItem>
    </Navbar>
);

export default header;