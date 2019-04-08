import { Component } from "react";
import { Parallax, Row, Input, Button, Tabs } from "react-materialize";
import WorkSearching from './WorkSearching.jsx';
import CustomerSearching from './CustomerSearching.jsx';

class MainSearchingPage extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Tabs>
                <WorkSearching />
                <CustomerSearching />
            </Tabs>
        )
    }
}

export default MainSearchingPage;
