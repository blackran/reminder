import React, { Component } from 'react'
import Input from './layouts/input/Input'
import { Button, Text } from 'react-native-elements';
import { View, StyleSheet } from "react-native";
import { connect } from 'react-redux'


class Header extends Component {
    render () {
        return (
            <View style={ styles.root }>
                {
                    this.props.tasks.showEdit
                    ? <Input/> : null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        margin: 5
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

export default connect(mapStateToProps, mapDispatchToProps)(Header)
