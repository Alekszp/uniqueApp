import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import {  } from "react-materialize";
import PublicPage from "./PublicPage.jsx";
import PageNotFound from "./Page404.jsx";
import Login from "./UnauthorizePage.jsx";
import HeaderNavComponent from "./Header.jsx";
import FooterNavComponent from "./Footer.jsx";
import Registration from "./RegistartionPage.jsx";
import Main from "./PageBody.jsx";
import "../css/loader.css";

class Page extends Component {
    constructor(props) {
        super(props);
        let user = this.parseUserCookie();
        console.log('first', user);

        this.state = {
            isAuth: false,
            user: null,
            isLoading: false,
            publicPageRoute: ''
        }
        if (user !== null) {
            // this.setState({user: user, isAuth: true });
            this.state.isAuth = true;
            this.state.user = user;
            console.log('sec', this.state.isAuth);
        };
        this.logIn = this.logIn.bind(this);
        this.logOut = this.logOut.bind(this);
        this.registrateUser = this.registrateUser.bind(this);
    }
    componentDidMount() {
        // console.log('componentWillMount()');
        // this.getUser();
    }
    parseUserCookie() {
        let cookies = unescape(document.cookie);
        let cookieCollection = _.split(cookies, ';');
        let userCookie = _.find(cookieCollection, (item) => {
            if (item.includes('user') && item.includes('firstName') && item.includes('lastName')) {
                return true;
            }
        });
        let jsonUser = _.split(userCookie, "user=")[1];
        if (jsonUser !== undefined) {
            return JSON.parse(jsonUser)
        } else return null;
    }
    getUser() {
        axios.get('/getuser')
            .then((res) => {
                console.log('isAuthorized()', res.data);
                this.setState({
                    user: res.data
                });
                // const { isAuth } = this.state;
                // window.Materialize.toast(`Hello, ${this.state.user.firstName} ${this.state.user.lastName}`, 4000, 'blue darken-1');
                // console.log('then', history, isAuth);
                // if (!isAuth) location.href = '/login';
            })
            .catch((err) => {  })

    }
    logIn(params) {
        this.setState({ isLoading: true });
        axios.post('/login', {
            login: params.loginValue,
            password: params.passwordValue
        }).then((res) => {
            this.setState({ isAuth: true, user: res.data, publicPageRoute: '' });
            const { history } = this.props;
            if (history) history.push('/main');
            this.setState({ isLoading: false });

        })
            .catch((e) => {
                this.setState({ isAuth: false, publicPageRoute: '/login' });
                this.setState({ isLoading: false });
                window.Materialize.toast(e.response.data.message, 4000, 'rounded red darken-1');
            });

    }
    logOut() {
        axios.post('/logout')
            .then((res) => {
                this.setState({ isAuth: false });
                const { history } = this.props;
                if (history) history.push('/login');
                window.Materialize.toast(`Good by, ${this.state.user.firstName} ${this.state.user.lastName}`, 4000, 'rounded green darken-4');
                this.setState({ user: null });
            })
    }
    registrateUser(params) {
        this.setState({ isLoading: true });
        axios.post('/registrationNewUser', {
            firstName: params.userFirstName,
            lastName: params.userLastName,
            password: params.password,
            userEmail: params.email
        }).then((res) => {
            this.setState({ isAuth: true, publicPageRoute: '' });
            this.setState({ isUniqueUser: true });
            const { history } = this.props;
            if (history) history.push('/main');
            window.Materialize.toast(`Hello, ${this.state.user.firstName} ${this.state.user.lastName}`, 4000, 'rounded blue darken-1')
            this.setState({ isLoading: false });
        }).catch((e) => {
            this.setState({ isAuth: false, publicPageRoute: '/registration' });
            console.log(this.state.publicPageRoute);
            this.setState({ isLoading: false });
            window.Materialize.toast(e.response.data.message, 4000, 'rounded red darken-1');

        })
    }
    render() {
        let { isAuth } = this.state;
        let { user } = this.state;
        let { isLoading } = this.state;
        let { publicPageRoute } = this.state;
        console.log(this.state);

        // console.log(user);
        return (
            <Router>
                {
                    isLoading ? (
                        <div className="loadingMask">
                            <div className="loader"></div>
                        </div>
                    ) : (
                            <div>
                                <Switch>
                                    <ProtectedRoute exact path='/main' isAuth={isAuth} publicPageRoute={publicPageRoute} user = {user} component={(props) => <HeaderNavComponent {...props} logOut={this.logOut} />} />
                                </Switch>
                                
                                <Switch>


                                    <Route exact path='/' component={(props) => <PublicPage {...props} auth={isAuth} logIn={this.logIn} />} />
                                    <Route exact path='/login' component={(props) => <Login {...props} auth={isAuth} logIn={this.logIn} />} />
                                    <Route exact path='/registration' component={(props) => <Registration {...props} auth={isAuth} registrateNewUser={this.registrateUser} />} />



                                    <ProtectedRoute exact path='/main' isAuth={isAuth} user={user} publicPageRoute={publicPageRoute} component={Main} />
                                    <Route path='/' component={PageNotFound} />
                                </Switch>
                                <Switch>
                                    <ProtectedRoute exact path='/main' isAuth={isAuth} user={user} publicPageRoute={publicPageRoute} component={FooterNavComponent} />
                                </Switch>


                            </div>
                        )

                }
            </Router>
        )
    }

}

class ProtectedRoute extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { isAuth, publicPageRoute, user, component: Component } = this.props;
        console.log(publicPageRoute);
        return (
            <div>
                <Route render={props => isAuth ? (
                    <Component {...props} user={user} isAuth={isAuth} />
                ) : (
                        publicPageRoute === '' ? (
                            <Redirect push to={{ pathname: '/login', state: { referrer: this.props.location } }} />
                        ) : (
                                <Redirect push to={{ pathname: publicPageRoute, state: { referrer: this.props.location } }} />
                            )

                    )
                } />
            </div>
        )
    }
}

export default withRouter(Page);