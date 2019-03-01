import React, { Fragment }  from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { createStore } from "redux";

import allReducers from "./reducers/CombineReducers.jsx";

import { Provider } from "react-redux";

import UnauthorizedPage from "./components/UnauthorizePage.jsx";
import RegistartionPage from "./components/RegistartionPage.jsx";
import PageBody from "./components/PageBody.jsx";
import ProfileSettings from "./components/ProfileSettings.jsx";
import HeaderNavComponent from "./components/Header.jsx";
import FooterNavComponent from "./components/Footer.jsx";


import "./css/flexModifier.css";
import "./css/WebPage.css";

const store = createStore(allReducers);

const wrapper = document.getElementById("app");
ReactDOM.render(
   <Provider store={store}>
      <Router>
         <Fragment>
            <Switch>
               <Route path='/UnauthorizedPage' component={() => <Fragment />} />
               <Route path='/RegistrationForm' component={() => <Fragment />} />
               <Route path='/' component={HeaderNavComponent} />
            </Switch>
            <Switch>
               <Route path='/UnauthorizedPage' exact component={UnauthorizedPage} />
               <Route path='/RegistrationForm' exact component={RegistartionPage} />
               <Route path='/ProfileSettings' component={ProfileSettings} />
               <Route path='/' component={PageBody} />
            </Switch>
            <Switch>
               <Route path='/UnauthorizedPage' component={() => <Fragment />} />
               <Route path='/RegistrationForm' component={() => <Fragment />} />
               <Route path='/' component={FooterNavComponent} />               
            </Switch>
         </Fragment>
      </Router>
   </Provider>, wrapper
)