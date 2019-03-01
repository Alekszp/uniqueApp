import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button } from "react-materialize";
import { select } from "../actions/Index.js";


class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isWorkersList: true
        };
        this.listSwitcher = this.listSwitcher.bind(this);
    }
    listSwitcher(bool){
        this.setState({
            isWorkersList: bool
        });
    }
    showList() {
        if(this.state.isWorkersList){
            return this.props.workers.map((worker) => {
                return (
                    <li onClick={() => this.props.selectedItem(worker)}
                        key={worker.id}>{`${worker.firstName} ${worker.lastName}`}</li>
                )
            });
        } else {
            return this.props.customers.map((customer) => {
                return (
                    <li onClick={() => this.props.selectedItem(customer)}
                        key={customer.id}>{`${customer.firstName} ${customer.lastName}`}</li>
                )
            })
        }
        
    }
    render() {
        var activeWorkersList = this.state.isWorkersList ? 'blue-grey darken-1' : 'blue-grey lighten-5 grey-text';
        var activeCustomersList = this.state.isWorkersList ? 'blue-grey lighten-5 grey-text' : 'blue-grey darken-1';
        return (
            <div>
                <div className='asideControlsBtn'>
                    <Button waves='light' className={`flex1 ${activeWorkersList}`} onClick={()=> this.listSwitcher(true)}>Slaves</Button>
                    <Button waves='light' className={`flex1 ${activeCustomersList}`} onClick={()=> this.listSwitcher(false)}>Masters</Button>
                </div>
                <ul className='asideList z-depth-4 blue-grey lighten-5'>
                    {this.showList()}
                </ul>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        customers: state.customers,
        workers: state.workers
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ selectedItem: select }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(UsersList);