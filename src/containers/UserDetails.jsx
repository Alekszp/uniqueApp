import React, { Component } from "react";
import { connect } from "react-redux";

class Details extends Component {

    render() {
        if (!this.props.user) return <div className='flex_row contentContainer'><h1>Select user</h1></div>

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