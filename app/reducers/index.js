import { combineReducers } from 'redux'
import TasksReducers  from './TasksReducers'

export default combineReducers(
    {
        Tasks: TasksReducers
    }
)
