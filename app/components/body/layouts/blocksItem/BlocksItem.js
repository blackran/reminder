import React, { Component } from 'react'
import { View, TouchableOpacity , Alert, Text, Dimensions, Animated } from 'react-native'
import { connect } from 'react-redux'
import { Icon as IconE } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import Move from '../../../animations/Move'

const { width } = Dimensions.get('window')

class BlocksItem extends Component {
    constructor(props) {
        super(props)
    }

    OnCheck (id) {
        if (this.isFalseLastDate(this.props.data)) {
            this.props.toggleChech(id)
        }
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

    ChangeShowPut (id) {
        this.props.changeShowPut({ status: true, id: id})
    }

    englishDate = (dt) => {
            let stock = dt.split('-')
        return stock[1] + '/' + stock[0] + '/' + stock[2]  
    }
    
    isFalseLastDate = (data) => {
        let date = new Date()

        let dd = date.getDate() 
        let mm = date.getMonth() + 1 
        let yyyy = date.getFullYear() 

        if (dd < 10) { 
            dd = '0' + dd
        } 
        if (mm < 10) { 
            mm = '0' + mm
        } 
        let today = dd + '-' + mm + '-' + yyyy

        let stock = true

        if (new Date(this.englishDate(data.finishAt)) - new Date(this.englishDate(today))< 0) {
            stock = false
        }

        return stock
    }

    render() {
        const { data, i } = this.props
        return (
            <Animated.View>
            <Move
                delais={i * 10}
                xD={(i + 1) * width}
                yD={0}
            >
            <View
                style={{ 
                    backgroundColor: '#eee', 
                    flexDirection: 'row', 
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 10,
                    margin: 5,
                    borderRadius: 5
                }}
                >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                    style={{ backgroundColor: 'transparent', padding: 10, marginRight: 5 }}
                    onPress={this.OnCheck.bind(this, data.idTasks)}
                    >
                    <View
                        style={{ 
                            borderWidth: 2, 
                            height: 25,
                            width: 25,
                            borderRadius: 25, 
                            borderColor: '#517fa4cc',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {
                            data.finishTasks? 
                            <Icon
                                name={'check'}
                                color='#517fa4cc'
                                size={20}
                            />:null
                        }
                    </View>
                </TouchableOpacity>
                <View>
                    <Text 
                        style={{
                            textDecorationLine: data.finishTasks? 'line-through': 'none',
                            fontWeight: 'bold',
                            fontSize: 24,
                            marginBottom: 3,
                            color:'#517fa4'
                        }}
                    >
                        { data.contentTasks } 
                    </Text> 
                    <View style={{ flexDirection: 'row' }}>
                        <Icon
                            name={'calendar'}
                            color='#517fa4cc'
                            size={20}
                        />
                            <Text>{"  "}</Text>
                        <Text 
                        style={{ 
                            color:'#517fa4dd'
                        }}> 
                            { data.finishAt } 
                        </Text> 
                    </View>
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
                    onPress={ this.ChangeShowPut.bind(this, data.idTasks) }
                /> 

                <Text>{" "}</Text>

                <IconE
                    reverse
                    name='delete'
                    type='AntDesign'
                    color='#f50'
                    size={20}
                    onPress={this.deleteTask.bind(this, data.idTasks)}
                /> 
                </View>
            </View>
        </Move>
    </Animated.View>
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
        removeTask: (id) => {
            dispatch({ type: 'REMOVE_TASKS', id})
        },
        changeShowPut: (data) => {
            dispatch({ type: 'CHANGE_SHOW_PUT', data})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlocksItem)
