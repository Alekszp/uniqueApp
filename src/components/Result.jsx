import React, { Component } from "react";
import ReactDOM from "react-dom";


import { BrowserRouter, Route, Switch } from "react-router-dom";

const Router = BrowserRouter;

class Main extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <h2>Main</h2>;
    }
}
class About extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <h2>About</h2>;
    }
}
class NotFound extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <h2>Not found</h2>;
    }
}

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path='/' component={Main} />
            <Route path='/about' component={About} />
            <Route component={NotFound} />
        </Switch>
    </Router>,
    wrapper) : false;

export {Router, Switch, Route};