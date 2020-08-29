import React , { Component } from 'react';
import { Provider } from 'react-redux'
import store from '../store'
import AppAnnex from "./AppAnnex"

class App extends Component {
    render () {
        return (
            <Provider store={store}>
                <AppAnnex/>
            </Provider>
        )
    }
}

export default App;
