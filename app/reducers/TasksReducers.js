import { ADD_TASKS, REMOVE_TASKS, TOGGLE_CHECK, INIT_DATA, CHANGE_SHOW_EDIT, CHANGE_SHOW_PUT, CHANGE_TASKS } from '../actions/TasksActions'
import shortid from 'shortid'
import  AsyncStorage  from '@react-native-community/async-storage'

const initState = {
    dataTasks: [
        // {
        //     idTasks: 1,
        //     contentTasks: 'matory',
        //     finishTasks: true,
        //     finishAt: ''
        //     createAt: ''
        // }
    ],
    showEdit: false,
    length: 0,
    idEdit: false
}

const TasksReducers = (state = initState, action) => {
    state.length = state.dataTasks.filter(e => { return e.finishTasks === true }).length
    switch (action.type) {
        case ADD_TASKS:
            var stock = [
                ...state.dataTasks, 
                { 
                    idTasks: shortid.generate(), 
                    contentTasks: action.data.contentTasks, 
                    finishTasks: false, 
                    finishAt: action.data.finishAt,
                    createAt: Date.now() 
                } 
            ]
            AsyncStorage.setItem('todoNante', JSON.stringify(stock))
            return Object.assign(
                {}, state
                , {dataTasks: stock}
            )
        case INIT_DATA:
            // AsyncStorage.removeItem('todoNante')
            return Object.assign(
                {}, state
                , {dataTasks: action.data}
            )
        case REMOVE_TASKS:
            var stock = state.dataTasks.filter(e => {
                return e.finishTasks !== true
            })
            AsyncStorage.setItem('todoNante', JSON.stringify(stock))
            return Object.assign({}, state, { dataTasks: stock })
        case CHANGE_SHOW_EDIT:
            return Object.assign({}, state, {showEdit: action.data})

        case CHANGE_TASKS:
            let const_change_tasks = state.dataTasks.map(e => {
                let stock = e
                if (e.idTasks === action.data.idTasks) {
                    stock = {        
                        idTasks: e.idTasks,
                        contentTasks: e.contentTasks,
                        finishTasks: e.finishTasks,
                        finishAt: e.finishAt,
                        createAt: e.createAt
                    }
                }
                return stock
            })
            return Object.assign({}, state, {dataTasks: const_change_tasks})

        case CHANGE_SHOW_PUT:
            return Object.assign({}, state, {showEdit: action.data.status, idEdit: action.data.id})

        case TOGGLE_CHECK:
            var stock = state.dataTasks.filter(e => {
                return e.idTasks === action.id
            })[0]
            var stocknot = state.dataTasks.filter(e => {
                return e.idTasks !== action.id
            })
            var stocks = { 
                idTasks: stock.idTasks, 
                contentTasks: stock.contentTasks, 
                finishTasks: !stock.finishTasks, 
                finishAt: stock.finishAt,
                createAt: stock.createAt 
            }
            AsyncStorage.setItem('todoNante', JSON.stringify([...stocknot, stocks ]))
            return Object.assign(
            {}, state
            , {dataTasks: [...stocknot, stocks ]}
        )
        default:
            return state
    }
}

export default TasksReducers
