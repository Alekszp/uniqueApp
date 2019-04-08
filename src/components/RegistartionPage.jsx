import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Input, Button, Col, Toast } from "react-materialize";
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
    
    componentDidMount(){
        axios.post('/logout')
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

        this.props.registrateNewUser(this.state);
        // axios.post('/registrationNewUser', {
        //     firstName: this.state.userFirstName,
        //     lastName: this.state.userLastName,
        //     password: this.state.password,
        //     userEmail: this.state.email,
        //     message: ''
        // })

    }

    render() {
        let { message } = this.props;
        return (
            <div className='registartionPage grey darken-3'>
                <div className='registrationForm grey darken-4'>
                    <Row>
                        <Input s={12} label="First Name" onChange={this.userFirstNameCatching} />

                        <Input s={12} label="Last Name" onChange={this.userLastNameCatching} />
                        <Input s={12} type="email" label="Email" onChange={this.emailCatching} />
                        <Input s={12} type="password" label="Password" onChange={this.passwordCatching} />
                        {/* <Input s={12} type="password" label="Password confirmation" /> */}

                    </Row>
                    <Row>
                        <Col s={6} className='flex_row flex_center'>
                            <Link to='/main'>
                                <Button className='orange accent-3' waves='light' onClick={this.registrateNewUser}>OK</Button>
                            </Link>
                        </Col>
                        <Col s={6} className='flex_row flex_center'>
                            <Link to='/login'>
                                <Button className='orange accent-3' waves='light'>Login</Button>
                            </Link>
                        </Col>
                    </Row>
                    {/* <Row offset={3} s={6}>
                        <span s={12}>{message}</span>
                    </Row> */}

                </div>
            </div>
        )
    }
}

export default RegistartionPage;