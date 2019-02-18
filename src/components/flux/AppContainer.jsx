import App from "./AppView";
import { Container } from "flux/utils";
import { React, Component } from "react";
import PhoneStore from "./PhoneStore";
import Actions from "./Actions";

class AppContainer extends Component {
    static getStores() {
        return [PhoneStore];
    }
    static calculateState(prevState) {
        return {
            phones: PhoneStore.getState(),
            onAddItem: Actions.addItem,
            onRemoveItem: Actions.removeItem
        };
    }
    render() {
        return (
            <App phones={this.state.phones}
                onRemoveItem={this.state.onRemoveItem}
                onAddItem={this.state.onAddItem} />;
        )
    }
}

export default Container.create(AppContainer);
