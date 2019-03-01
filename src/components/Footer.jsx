import React from "react";
import { Footer } from 'react-materialize';

const footer = () => (
    <Footer copyrights="&copy 2019 Copyright Text"
        moreLinks={<a className="grey-text right" href="#!">More Links</a>}
        links={
            <ul>
                <li><a className="grey-text text-lighten-3" href="#!">Link 1</a></li>
                <li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>
                <li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>
                <li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>
            </ul>
        }
        className='blue-grey darken-3 z-depth-1 footer'
    >
        <h5 className="white-text">Footer Content</h5>
        <p className="grey-text blue-grey darken-3">You can use rows and columns here to organize your footer content.</p>
    </Footer>
);

export default footer;