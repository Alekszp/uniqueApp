import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from "react-router-dom";
import PageNotFound from "./Page404.jsx";

function Page() {
    return (
        <Router>
            <div>
                <ul>
                    <li><Link to='/public'>Go public page</Link></li>
                    <li><Link to='/private'>Go private page</Link></li>
                </ul>
                <Switch>
                    <Route exact path='/public' component={Public} />
                    <ProtectedRoute path='/private' component={Private} />
                    <Route component={PageNotFound} />
                </Switch>
                <AuthBtn />
            </div>
        </Router>
    )
}

const AuthBtn = withRouter(({ history }) =>

    Auth.isAuth ? (
    <p>
        <span>Welcome!&nbsp;</span>
        <button onClick={() => {
            Auth.signOut(() => {console.log(history); history.push("/public")})
        }}>Sign Out</button>
    </p>
) : (
        <p>
            <span>You are not logged in &nbsp;</span>
            <button onClick={() => {
                Auth.signIn(() => {console.log(history); history.push("/private")});
            }}>Sign In</button>
        </p>
    )
        );

// function AuthBtn () {
//     return (
//         <button>Btn</button>
//     )
// }

function Public() {
    return (
        <h1>Public page for all!</h1>
    )
}

function Private() {
    return (
        <h1>Private page for you!</h1>
    )
}
function NotFound() {
    console.log(`not found route ${Auth.isAuth}`);
    return (
        <h1>Page not found!</h1>
    )
}

const Auth = {
    isAuth: false,
    signIn(colobok) {
        this.isAuth = true;
        console.log(this.isAuth);
        setTimeout(colobok, 100)
    },
    signOut(colobok) {
        this.isAuth = false;
        console.log(this.isAuth);
        setTimeout(colobok, 100)
    }
}
function ProtectedRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest} render={props => Auth.isAuth ? (
            <Component {...props} />
        ) : (
                <Redirect to={{ pathname: '/public', state: { from: props.location } }} />
            )
        }
        />
    )
}

function InputFields() {
    return (
        <div>
            <input type="text"  />
            <input type="text" />

        </div>
    )
}

// class InputFields extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             login: '',
//             password: ''
//         }
//         this.getLoginValue = this.getLoginValue.bind(this);
//         this.getPasswordValue = this.getPasswordValue.bind(this);

//     }
//     getLoginValue(e) {
//         this.setState({
//             login: e.target.value
//         })
//     }
//     getPasswordValue(e) {
//         this.setState({
//             password: e.target.value
//         })
//     }
//     render() {
//         const { history } = this.props;
//         return (
//             <div>
//                 <input type="text" onChange={this.getLoginValue} />
//                 <input type="text" onChange={this.getPasswordValue} />

//             </div>
//         )
//     }
// }

// withRouter(InputFields);

export default Page;
// export {Main, About, NotFound};
