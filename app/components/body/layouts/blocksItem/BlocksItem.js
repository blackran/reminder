import React, { Component } from 'react'
import { View, TouchableOpacity , Alert, Text } from 'react-native'
import { connect } from 'react-redux'
import { Icon as IconE } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

class BlocksItem extends Component {
    constructor(props) {
        super(props)
    }

    OnCheck (id) {
        this.props.toggleChech(id)
    }

    deleteTask (id) {
        Alert.alert(
            'Affirmation',
            'vous voulez suprimer cette tache',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => this.props.removeTask(id)},
            ],
            {cancelable: false},
        );
    }

    ChangeShowPut () {
        this.props.changeShowPut(true)
    }

    render() {
        const { data } = this.props
        return (
            <TouchableOpacity
                style={{ 
                    backgroundColor: data.finishTasks? '#eee': '#aaa', 
                    flexDirection: 'row', 
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 10,
                    margin: 5,
                    borderRadius: 5
                }}
                onPress={this.OnCheck.bind(this, data.idTasks)}>
            <View>
                <Text 
                    style={{
                        textDecorationLine: data.finishTasks? 'line-through': 'none',
                        fontWeight: 'bold',
                        fontSize: 24,
                        marginBottom: 3
                    }}
                >
                    { data.contentTasks } 
                </Text> 
                <View style={{ flexDirection: 'row' }}>
                    <Icon
                        name={data.finishTasks? 'check': 'calendar'}
                        color='#517fa4'
                        size={20}
                        onPress={ this.ChangeShowPut.bind(this) }
                    /><Text>{"  "}</Text>
                    <Text 
                    style={{ 
                        opacity: 0.5, 
                        textDecorationLine: data.finishTasks? 'line-through': 'none',
                        color: 'blue'
                    }}> 
                        { data.finishAt } 
                    </Text> 
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <IconE
                    raised
                    name='edit'
                    type='AntDesign'
                    // color='#9b9b9b'
                    color='#517fa4'
                    size={20}
                    onPress={ this.ChangeShowPut.bind(this) }
                /> 

                <Text>{"   "}</Text>

                <IconE
                    reverse
                    name='delete'
                    type='AntDesign'
                    color='#f50'
                    size={20}
                    onPress={this.deleteTask.bind(this, data.idTasks)}
                /> 
                </View>
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = state => {
    return {  tasks: state.Tasks }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleChech: (id) => {
            dispatch({ type: 'TOGGLE_CHECK', id })
        },
        removeTask: () => {
            dispatch({ type: 'REMOVE_TASKS'})
        },
        changeShowPut: (data) => {
            dispatch({ type: 'CHANGE_SHOW_PUT', data})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlocksItem)
