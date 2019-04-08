import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Row, Input, Button, Col } from "react-materialize";
import axios from "axios";

class UnauthorizePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginValue: '',
            passwordValue: '',
            message: '',
            link: '/login'
        };
        this.logIn = this.logIn.bind(this);
        this.loginValue = this.loginValue.bind(this);
        this.passwordValue = this.passwordValue.bind(this);
        // this.getUser = this.getUser.bind(this);
    }
    componentWillMount() {
        // var socket = io.connect('http://localhost:7001');
        // socket.on('connected', message => {
        //     socket.emit('receiveHistory')
        // });
        // socket.on('message', (item) => {
        //     let newMessagesHistory = this.state.messages;
        //     newMessagesHistory.push(item);
        //     this.setState({
        //         messages: newMessagesHistory
        //     });
        // });
        // socket.on('error', (error)=>{console.log(error)});
        // socket.on('history', messages => {
        //     this.setState({
        //         messages: messages
        //     })
        // })
        axios.post('/logout')
    }

    loginValue(e) {
        this.setState({
            loginValue: e.target.value
        });
    }

    passwordValue(e) {
        this.setState({
            passwordValue: e.target.value
        });
    }
    logIn() {
        this.props.logIn(this.state);
    }
    render() {

        let { auth } = this.props;
        let { message } = this.props;
        return (
            <div className='loginPage grey darken-3'>
                <div className='loginForm grey darken-4 grey-text text-lighten-3'>
                    <Row offset={3} s={6}>
                        <Input s={12} label="Login" onChange={this.loginValue} />
                        <Input type="password" onChange={this.passwordValue} label="Password" s={12} />

                    </Row>

                    <Row offset={3} s={6}>
                        <Col s={6} className='flex_row flex_center'>
                            <Link to='/main'>
                                <Button className='orange accent-3' waves='light' onClick={this.logIn}>Login</Button>
                            </Link>
                        </Col>
                        <Col s={6} className='flex_row flex_center'>
                            <Link to='/registration'>
                                <Button className='orange accent-3' waves='light'>Registration</Button>
                            </Link>
                        </Col>
                    </Row>
                    {/* <Row offset={3} s={6}>
                        <span s={12}>{message}</span>
                    </Row> */}

                </div>
            </div >
        )
    }
}

export default UnauthorizePage;