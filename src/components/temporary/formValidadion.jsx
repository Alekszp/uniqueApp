import React, { Component } from "react";
import ReactDOM from "react-dom";

class NameField extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: 'some name',
            isValid: true
        };
        this.changedName = this.changedName.bind(this);
    }
    validateName(name){
        return name.length > 2;
    }
    changedName(e){
        let valid = this.validateName(e.target.value);
        this.setState({
            name: e.target.value,
            isValid: valid
        });
    }
    render(){
        let validationColor = this.state.isValid ? 'green' : 'red';
        return (
            <div>
                <label>Name:</label>
                <input type="text"
                    onChange={this.changedName}
                    value={this.state.name}
                    style={{borderColor: validationColor}}/>
            </div>
        )
    }
}
class AgeField extends Component {
    constructor(props){
        super(props);
        this.state = {
            age: 18,
            isValid: true
        };
        this.changedAge = this.changedAge.bind(this);
    }
    validateAge(age){
        return age > 0;
    }
    changedAge(e){
        let valid = this.validateAge(e.target.value);
        this.setState({
            age: e.target.value,
            isValid: valid
        })
    }
    render(){
        let validationColor = this.state.isValid ? 'green' : 'red';
        return (
            <div>
                <label>Age:</label>
                <input type="number"
                    onChange={this.changedAge}
                    value={this.state.age}
                    style={{borderColor: validationColor}}/>
            </div>
        )
    }
}
class UserForm extends Component {
    constructor(props) {
        super(props);
        this.sendForm = this.sendForm.bind(this);
    }
    sendForm(e) {
        // e.preventDefault();
        if (this.refs.nameField.state.isValid && this.refs.ageField.state.isValid) alert(`Name: ${this.refs.nameField.state.name} Age: ${this.refs.ageField.state.age}`);
    }
    render() {
        return (
            <div>
                <NameField ref="nameField"/>
                <AgeField ref="ageField"/>
                <button onClick={this.sendForm}>Send</button>
            </div>
        )
    }

}

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<UserForm />, wrapper) : false;

export default UserForm;