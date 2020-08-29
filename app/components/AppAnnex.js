import React , { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    StatusBar,
    View
} from 'react-native';

// import {
//   Colors,
// } from 'react-native/Libraries/NewAppScreen';
import { Provider } from 'react-redux'
import store from '../store'

import Header from './header/Header'
import Body from './body/Body'
import {Button, Icon} from 'react-native-elements'
import { connect } from 'react-redux'
// import Login from './components/login/Login'

class AppAnnex extends Component {
    render () {
        return (
            <Provider store={store}>
                <View style={styles.root}>
                    <View>
                        <Header/>
                        <Body/>
                    </View>
                    <View style={styles.iconAdd}>
                        {
                            !this.props.tasks.showEdit
                                ?
                                <Icon
                                    reverse
                                    name='add'
                                    type='MaterialIcons'
                                    color='#f50'
                                    size={30}
                                    onPress={() => this.props.changeShowEdit(true)}
                                /> : null
                        }
                    </View>
                </View>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    iconAdd: {
        flex: 1,
        position: 'absolute',
        bottom: 20,
        right: 30,
        marginLeft: 10
    }
});


const mapStateToProps = state => {
    return {  tasks: state.Tasks }
}

const mapDispatchToProps = dispatch => {
    return {
        changeShowEdit: (data) => {
            dispatch({ type: 'CHANGE_SHOW_EDIT', data })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppAnnex);
