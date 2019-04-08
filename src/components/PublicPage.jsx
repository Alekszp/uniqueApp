import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Parallax, Row, Input, Button } from "react-materialize";

class PublicPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Parallax imageSrc="http://materializecss.com/images/parallax1.jpg" />

                <div className='startPageBtnContainer'>
                    <Link to='/login'>
                        <Button
                            node="a"
                            waves="light"
                            large
                            className='blue darken-1'
                        >
                            Login
                        </Button>
                    </Link>
                    <Link to='/registration'>
                        <Button
                            node="a"
                            waves="light"
                            large
                            className='blue darken-4'
                            style={{marginLeft: '10px'}}
                        >
                            Registration
                        </Button>
                    </Link>
                </div>

                <div className='section white-text blue darken-3'>
                    <div className="row container">
                        <h2 className="header">
                            Searching system
                        </h2>
                        <p>
                            Easy way to searching any workers and building teams
                        </p>
                    </div>
                </div>

                <Parallax imageSrc="http://materializecss.com/images/parallax2.jpg" />

                <div className='section white-text blue darken-3'>
                    <div className="row container">
                        <h2 className="header">
                            Your customer is waiting!
                        </h2>
                        <p>
                            Finding a good order is easy as a cup of coffee
                        </p>
                    </div>
                </div>
                
                <Parallax imageSrc="http://materializecss.com/images/parallax1.jpg" />
            </div>
        )
    }
}

export default PublicPage;