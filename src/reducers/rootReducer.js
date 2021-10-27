import {combineReducers} from 'redux'
import { calendarReducer } from './calendarReducer'
import { uiReducer } from './uiReducer'


export const rootReducer = combineReducers({
    iu:uiReducer,
    caledar:calendarReducer
})
