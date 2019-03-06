import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Input, Button, Col } from "react-materialize";

class UnauthorizePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginValue: '',
            messages: []
        };
        this.typingMessage = this.typingMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }
    componentWillMount() {
        var socket = io.connect('http://localhost:7001');
        socket.on('connected', message => {
            socket.emit('receiveHistory')
        });
        socket.on('message', (item) => {
            let newMessagesHistory = this.state.messages;
            newMessagesHistory.push(item);
            this.setState({
                messages: newMessagesHistory
            });
        });
        socket.on('error', (error)=>{console.log(error)});
        socket.on('history', messages => {
            this.setState({
                messages: messages
            })
        })

    }
    
    typingMessage(e) {
        this.setState({
            loginValue: e.target.value
        });
    }

    sendMessage() {
        let messageContent = this.state.loginValue.trim();
        if(messageContent !== '') {
            socket.emit('msg', this.state.loginValue);
            
            this.setState({ loginValue: '' });
        }
        
    }
    render() {
        return (
            <div className='loginPage blue-grey lighten-5'>
                <div className='loginForm blue-grey darken-2 grey-text text-lighten-3'>
                    <Row offset={3} s={6}>
                        <Input s={12} label="Login" onChange={this.typingMessage} value={this.state.loginValue} />
                        <Input type="password" label="Password" s={12} />
                        <ul>
                            {
                                this.state.messages.map((i)=>{
                                    return (
                                        <li key={i.date}>
                                            {i.content}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </Row>

                    <Row offset={3} s={6}>
                        <Col s={6} className='flex_row flex_center'>
                            {/* <Link to='/'>
                                <Button waves='light'>OK</Button>
                            </Link> */}
                            <Button waves='light' onClick={this.sendMessage}>send message</Button>

                        </Col>
                        <Col s={6} className='flex_row flex_center'>
                            <Link to='/registrationForm'>
                                <Button waves='light'>Registration</Button>
                            </Link>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default UnauthorizePage;