import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Input, Button, Col } from "react-materialize";
import axios from "axios";

class RegistartionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userFirstName: '',
            userLastName: '',
            password: '',
            email: '',
        };
        this.userFirstNameCatching = this.userFirstNameCatching.bind(this);
        this.userLastNameCatching = this.userLastNameCatching.bind(this);
        this.emailCatching = this.emailCatching.bind(this);
        this.passwordCatching = this.passwordCatching.bind(this);
        this.registrateNewUser = this.registrateNewUser.bind(this);
    }
    userFirstNameCatching(e) {
        this.setState({
            userFirstName: e.target.value
        })
    }
    userLastNameCatching(e) {
        this.setState({
            userLastName: e.target.value
        })
    }
    emailCatching(e) {
        this.setState({
            email: e.target.value
        })
    }
    passwordCatching(e) {
        this.setState({
            password: e.target.value
        })
    }

    registrateNewUser() {
        axios.post('/RegistrationForm', {
            // addedAt: new Date(),
            firstName: this.state.userFirstName,
            lastName: this.state.userLastName,
            password: this.state.password,
            userEmail: this.state.email,
        })
       
    }
    render() {

        return (
            <div className='registartionPage blue-grey lighten-5'>
                <div className='registrationForm blue-grey darken-2 grey-text text-lighten-3'>
                    <Row>
                        <Input s={12} label="First Name" onChange={this.userFirstNameCatching} />

                        <Input s={12} label="Last Name" onChange={this.userLastNameCatching} />
                        <Input s={12} type="email" label="Email" onChange={this.emailCatching} />
                        <Input s={12} type="password" label="Password" onChange={this.passwordCatching} />
                        {/* <Input s={12} type="password" label="Password confirmation" /> */}

                    </Row>
                    <Row>
                        <Col s={6} className='flex_row flex_center'>
                            {/* <Link to='/'>
                                <Button waves='light'>OK</Button>
                            </Link> */}
                            <Button waves='light' onClick={this.registrateNewUser}>OK</Button>
                        </Col>
                        <Col s={6} className='flex_row flex_center'>
                            <Link to='/UnauthorizedPage'>
                                <Button waves='light'>Back</Button>
                            </Link>
                        </Col>
                    </Row>
                </div>
            </div >
        )
    }
}

export default RegistartionPage;