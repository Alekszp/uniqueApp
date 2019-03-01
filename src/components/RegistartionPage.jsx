import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Input, Button, Col } from "react-materialize";

class RegistartionPage extends Component {

    render() {

        return (
            <div className='registartionPage blue-grey lighten-5'>
                <div className='registrationForm blue-grey darken-2 grey-text text-lighten-3'>
                    <Row>
                        <Input s={12} label="First Name" />

                        <Input s={12} label="Last Name" />
                        <Input s={12} type="email" label="Email" />
                        <Input s={12} type="password" label="Password" />
                        <Input s={12} type="password" label="Password confirmation" />

                    </Row>
                    <Row>
                        <Col s={6} className='flex_row flex_center'>
                            <Link to='/'>
                                <Button waves='light'>OK</Button>
                            </Link>
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