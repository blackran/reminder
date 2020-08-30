import React, {Component} from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux'
import { CheckBox, ButtonGroup } from 'react-native-elements'
import {ScrollView, StyleSheet, View, Alert, Text} from 'react-native'
import {Colors} from "react-native/Libraries/NewAppScreen";
import Icon from 'react-native-vector-icons/FontAwesome'
import BlocksItem from './layouts/blocksItem/BlocksItem'

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: true,
            selectedIndex: 0
        }
    }

    OnCheck (id) {
        this.props.toggleChech(id)
    }

    componentDidMount () {
        this.getData()
    }

    getData = async () => {
        var todo = await AsyncStorage.getItem('todoNante')
        if(todo !== null){
            this.props.initData(JSON.parse(todo))
        }
    }

    englishDate(dt) {
        let stock = dt.split('-')
        return stock[1] + '/' + stock[0] + '/' + stock[2]    }

    sortByDate () {
        return this.props.tasks.dataTasks.sort((a, b) => {
            return new Date(this.englishDate(a.finishAt)) - new Date(this.englishDate(b.finishAt));
        });
    }

    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
        this.filterData()
    }
    

    filterData () {
        var response = []
        var stock = this.sortByDate()
        switch (this.state.selectedIndex) {
            case 0:
                return stock
            case 1:
                return stock.filter(e=>{
                    return e.finishTasks === true
                })
            case 2:
                return stock.filter(e=>{
                    return e.finishTasks === false
                })
            default:
                return stock
        }
    }


    render() {
        const { tasks } = this.props
        // const buttons = ['Tous', 'finis', 'en cours']
        const component1 = () => 
            <View style={{ flexDirection: 'row' }}>
                <Icon
                    name='tasks'
                    size={20}
                    color={ this.state.selectedIndex === 0 ? 'white': '#555555' }
                />
            <Text style={{ color: this.state.selectedIndex === 0 ? 'white': '#555555' }}>
                {" "}Tout
            </Text>
        </View>
        const component2 = () =>
            <View style={{ flexDirection: 'row' }}>
                <Icon
                    name='check'
                    size={20}
                    type='entypo'
                    color={ this.state.selectedIndex === 1 ? 'white': '#555555' }
                />
            <Text style={{ color: this.state.selectedIndex === 1 ? 'white': '#555555' }}>
                {" "}Terminé
            </Text>
        </View>
        const component3 = () =>
            <View style={{ flexDirection: 'row' }}>
                <Icon
                    name='clock-o'
                    size={20}
                    type='entypo'

                    color={ this.state.selectedIndex === 2 ? 'white': '#555555' }
                />
            <Text style={{ color: this.state.selectedIndex === 2 ? 'white': '#555555' }}>
                {" "}En cours
            </Text>
        </View>
        const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }]
        return (
            <View style={{ marginTop: 30, flex: 1 }}>
                <View>
                    <Text style={{ textAlign:'center', fontWeight:'bold', fontSize: 30 }}>votre tâche {/* ({tasks.length}/{tasks.dataTasks.length})*/}</Text>
                    <ButtonGroup
                        onPress={this.updateIndex.bind(this)}
                        selectedIndex={this.state.selectedIndex}
                        buttons={buttons}
                        buttonStyle={{borderWidth: 0}}
                        containerStyle={{height: 40, borderWidth: 0}}
                        innerBorderStyle={{width: 0}}
                        containerBorderRadius={0}
                    />
                </View>

                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                    style={styles.scrollView}
                >
                    {
                        this.filterData().map((e, i)=>{
                            return <BlocksItem  key={e.idTasks} data={e} i={i}/>
                        })
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    scrollView: {
        padding: 5
    }
});

const mapStateToProps = state => {
    return {  tasks: state.Tasks }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleChech: (id) => {
            dispatch({ type: 'TOGGLE_CHECK', id })
        },
        initData: (data) => {
            dispatch({ type: 'INIT_DATA', data })
        },
        removeTask: () => {
            dispatch({ type: 'REMOVE_TASKS'})
        },
        changeTasks: (data) => {
            dispatch({ type: 'CHANGE_TASKS', data })
        },
        changeShowPut: (data) => {
            dispatch({ type: 'CHANGE_SHOW_PUT', data})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Body)
