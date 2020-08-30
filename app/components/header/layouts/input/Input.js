import React, { Component } from 'react'
import {TextInput, StyleSheet, View, Keyboard, Alert, Text} from 'react-native'
import { Button } from 'react-native-elements'
import { Icon } from 'react-native-elements'
import { connect } from "react-redux";
import {ADD_TASKS} from "../../../../actions/TasksActions";
import DatePicker from 'react-native-datepicker'

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            maxLength: 15,
            date: this.formatDateNow(),
            idEdit: null
        }
    }

    addTask () {
        const { value, date } = this.state
        if( value.length !== 0){
            let isError = false
            Keyboard.dismiss()
            if (this.props.tasks.idEdit !== '') {
                let data = {
                    contentTasks: value,
                    finishAt: date,
                    idTasks: this.state.idEdit
                }
                this.props.changeTasks(data)
                this.props.changeShowEdit(false)
                isError = true
            } else {
                let data = {
                    contentTasks: value,
                    finishAt: date
                }
                this.props.addTasks(data)
                this.props.changeShowEdit(false)
                isError = true
            }
            if (isError) {
                this.setState({ idEdit: null })
            }
        }
    }

    formatDateNow () {
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
        return today
    }

    annullerTask () {
        Keyboard.dismiss()
        this.props.changeShowEdit(false)
    }

    OnChange (text) {
        if(this.state.value.length <= this.state.maxLength){
            this.setState({ value: text })
        }
    }

    ifEdit() {
        if (this.props.tasks.idEdit != this.state.idEdit && this.props.tasks.idEdit != '') {
            const { tasks } = this.props
            const stock = tasks.dataTasks.filter(e=> {
                return e.idTasks === tasks.idEdit
            })
            this.setState({ idEdit: JSON.parse(JSON.stringify(this.props.tasks.idEdit))})
            if(stock.length != 0){
                this.setState({ value: stock[0].contentTasks, date: stock[0].finishAt})
            }
        }
    }
    componentDidMount() {
        this.ifEdit()
    }

    componentDidUpdate(){
        this.ifEdit()
    }

    render () {
        return (
            <View style={{ height: 120, marginBottom: 40, marginTop: 30 }}>
                <View style={{ backgroundColor: '#eceff1', height: 200, padding: 10, borderRadius: 5}}>

                    <TextInput
                        placeholder='Entrer la tâche'
                        value={this.state.value}
                        onChangeText={this.OnChange.bind(this)}
                        maxLength={this.state.maxLength}
                        onKeyUp={(e) => {
                            if (e.nativeEvent.key === 'Backspace') {
                                // Return if duration between previous key press and backspace is less than 20ms
                                if (Math.abs(this.lastKeyEventTimestamp - e.timeStamp) <= 20) return;
                                this.setState({value: this.state.value.pop()})
                            } else {
                                // Record non-backspace key event time stamp
                                this.lastKeyEventTimestamp = e.timeStamp;
                            }
                        }}
                        style={styles.textinput}/>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between' }}>
                        <DatePicker
                            style={{width: 200, marginBottom: 10}}
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="DD-MM-YYYY"
                            // minDate="01-05-2016"
                            // maxDate="06-01-2016"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                              dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                              },
                              dateInput: {
                                marginLeft: 36
                              }
                              // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => {this.setState({date: date})}}
                          />
                        <Text
                        style={{ marginBottom: 3, marginRight: 10 }}>
                            { this.state.value.length } /{ this.state.maxLength }
                        </Text>

                    </View>
                    <View style={styles.buttonsInput}>
                        <View style={styles.buttonInput}>
                            <Button
                                icon={
                                    <Icon
                                        name='save'
                                        size={25}
                                        type='entypo'
                                        color="white"
                                    />
                                }
                                onPress={this.addTask.bind(this)}
                                title=" Enregistrer"
                            />
                        </View>
                        <View style={styles.buttonInput}>
                            <Button
                                icon={
                                    <Icon
                                        name='cancel'
                                        size={25}
                                        type='MaterialIcons'
                                        color="white"
                                    />
                                }
                                buttonStyle={{ backgroundColor: '#ef5350' }}
                                onPress={this.annullerTask.bind(this)}
                                title=" Annuler"
                            />
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textinput: {
        borderWidth: 0,
        backgroundColor: 'white',
        borderRadius: 3,
        paddingLeft: 5,
        fontSize: 25,
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
        height: 45
    },
    button: {
        margin: '3px 0'
    },
    add: {
        width: 30,
        height: 30,
        fontSize: 40
    },
    buttonsInput: {
        flex: 1,
        flexDirection: 'row',
    },
    buttonInput: {
         flex: 1,
        height: 50,
        padding: 5
    }
})


const mapStateToProps = state => {
    return {  tasks: state.Tasks }
}

const mapDispatchToProps = dispatch => {
    return {
        addTasks: (data) => {
            dispatch({ type: 'ADD_TASKS', data })
        },
        changeTasks: (data) => {
            dispatch({ type: 'CHANGE_TASKS', data })
        },
        changeShowEdit: (data) => {
            dispatch({ type: 'CHANGE_SHOW_EDIT' })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Input)
