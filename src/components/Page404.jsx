import React, { Component } from "react";

class PageNotFound extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>Page not found!</h1><hr />
                <h2>404 ERROR!</h2>
            </div>
        )
    }
}

export default PageNotFound;