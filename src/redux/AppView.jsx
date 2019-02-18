import { React, Component } from "react";
import ReactRedux from "react-redux";
import actions from "./Actions";

const connect = ReactRedux.connect;

class FormPhone extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        if (this.refs.phoneInput.value !== "") {
            let itemText = this.refs.phoneInput.value;
            this.refs.phoneInput.value = "";
            return this.props.addPhone(itemText);
        }
    }
    render() {
        return (
            <div>
                <input ref="phoneInput" />
                <button onClick={this.onClick}>Add</button>
            </div>
        )
    }
}
class PhoneItem extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                <p>
                    <b>{this.props.text}</b><br />
                    <button onClick={() => this.props.deletePhone(this.props.text)}>Delete</button>
                </p>
            </div>
        )
    }
}
class PhonesList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                {this.props.phones.map(item => {
                    <PhoneItem key={item}
                        text={item}
                        deletePhone={this.props.deletePhone} />
                })}
            </div>
        )
    }
}
class AppView extends Component {
    render(){
        return (
            <div>
                <FormPhone addPhone={this.props.addPhone} />
                <PhonesList {...this.props} />
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        phones: state.get("phones")
    };
}

export default connect(mapStateToProps, actions)(AppView);