import React, { Fragment } from "react";
import { Button, Icon, Modal } from 'react-materialize';
import HeaderNavComponent from "./Header.jsx";
import FooterNavComponent from "./Footer.jsx";
// import SidenavComponent from "./Sidenav.jsx";
import UsersList from "../containers/UsersList.jsx";
import Details from "../containers/UserDetails.jsx";
import "../css/flexModifier.css";
import "../css/WebPage.css";

const WebPage = () => (
   <Fragment>
      <HeaderNavComponent />
      <section className='flex_row'> 
         <UsersList /> 
         <Details />
      </section>
      <FooterNavComponent />
   </Fragment>
);

export default WebPage;
