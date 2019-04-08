import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Collapsible, CollapsibleItem, Toast } from "react-materialize";

class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }
    componentWillMount() {
        this.getUserInfo();
    }
    getUserInfo() {
        axios.get('/getuser')
            .then((res) => {
                this.setState({ user: res.data })
            })
    }

    render() {
        if (!this.props.user) return <div className='flex_row contentContainer'><h1>Select user</h1></div>
        let { user } = this.state;
        return (
            <div className='flex_row contentContainer'>
                <div>
                    <img src={this.props.user.photo} alt="user photo" className='imageWrappew z-depth-4' />
                </div>
                <div className='flex_column userDescriptionContainer'>
                    <h2 className='userName'>{`${this.props.user.firstName} ${this.props.user.lastName}`}</h2>
                    {this.props.user.hasOwnProperty('skills') ? (<h5>Skills: {this.props.user.skills}</h5>) : (<span></span>)}
                    {this.props.user.hasOwnProperty('description') ? (<span>Description: {this.props.user.description}</span>) : (<span></span>)}
                    <span>Email: {this.props.user.email}</span>
                    <span>Phone: {this.props.user.phone}</span>
                    <span>First name: {user.firstName}</span>
                    <span>Last name: {user.lastName}</span>
                    <span>Email: {user.userEmail}</span>
                    <Collapsible accordion={false}>
                        <CollapsibleItem header="Better safe than sorry. That's my motto." icon="filter_drama">
                            Better safe than sorry. That's my motto.
                        </CollapsibleItem>
                        <CollapsibleItem header="Yeah, you do seem to have a little 'shit creek' ac…" icon="place">
                            Yeah, you do seem to have a little 'shit creek' action going.
                        </CollapsibleItem>
                        <CollapsibleItem header="You know, FYI, you can buy a paddle. Did you not p…" icon="whatshot">
                            You know, FYI, you can buy a paddle. Did you not plan for this contingency?
                        </CollapsibleItem>
                    </Collapsible>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        user: state.selected
    }
}

export default connect(mapStateToProps)(Details);