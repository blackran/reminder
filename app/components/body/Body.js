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

    sortByDate () {
        return this.props.tasks.dataTasks.sort((a, b) => {
            return new Date(a.createAt) - new Date(b.createAt);
        });
    }

    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
        this.filterData()
    }

    filterData () {
        var response = []
        var stock = this.props.tasks.dataTasks
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
        this.sortByDate()
        // const buttons = ['Tous', 'finis', 'en cours']
        const component1 = () => 
            <View style={{ flexDirection: 'row' }}>
                <Icon
                    name='tasks'
                    size={20}
                    color={ this.state.selectedIndex === 0 ? 'white': '#555555' }
                />
            <Text style={{ color: this.state.selectedIndex === 0 ? 'white': '#555555' }}>
                {" "}Touts
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
                {" "}Finish
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
            <View style={{ marginTop: 30 }}>
                <Text style={{ textAlign:'center', fontWeight:'bold', fontSize: 30 }}>votre tache</Text>
                <View>
                    <ButtonGroup
                        onPress={this.updateIndex.bind(this)}
                        selectedIndex={this.state.selectedIndex}
                        buttons={buttons}
                        containerStyle={{height: 40}}
                    />
                </View>
                <View style={styles.root}>


                </View>

                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}
                >
                    {
                        this.filterData().map((e)=>{
                            return <BlocksItem  key={e.idTasks} data={e}/>
                        })
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: 'white',
        flexDirection:'row',
        // justifyContent: 'flex-end',
        marginLeft: 20,
        paddingRight: 10
    },
    scrollView: {
        //backgroundColor: Colors.lighter,
        padding: 5,
        marginBottom: 35
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
        changeShowPut: (data) => {
            dispatch({ type: 'CHANGE_SHOW_PUT', data})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Body)
