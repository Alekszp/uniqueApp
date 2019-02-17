import React, { Component } from "react";
import ReactDOM from "react-dom";


import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";

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
        const id = this.props.match.params.id;
        const name = this.props.match.params.name;
        return <h2>id: {id} Name: {name}</h2>;
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
class Product extends Component {
    render() {
        const prodId = this.props.match.params.id;
        return (
            <h2>Product #: {prodId}</h2>
        )
    }
}
class ProductList extends Component {
    render() {
        return (
            <h2>Products list</h2>
        )
    }
}
class Products extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/products" component={ProductList} />
                    <Route path="/products/:id" component={Product} />
                </Switch>
            </div>
        )
    }
}
class Nav extends Component {
    render() {
        return (
            <nav>
                <NavLink exact to="/" activeClassName="active">Main</NavLink>
                <NavLink to="/about" activeClassName="active">About</NavLink>
                <NavLink to="/products" activeClassName="active">Products</NavLink>
            </nav>
        )
    }
}

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(
    <Router>
        <div>
            <Switch>
                <Route exact path='/' component={Main} />
                <Route path='/about/:id/:name' component={About} />
                <Route path='/products' component={Products} />
                <Route component={NotFound} />
            </Switch>
        </div>

    </Router>,
    wrapper) : false;

export { Router, Switch, Route };