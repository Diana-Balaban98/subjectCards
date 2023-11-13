import { subjectInfoReducer } from '@/state'
import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'

const rootReducer = combineReducers({
  subjectInfo: subjectInfoReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootState = ReturnType<typeof rootReducer>

export type AppDispatch = ThunkDispatch<AppRootState, unknown, AnyAction>

export type AppThunk = ThunkAction<void, AppRootState, unknown, AnyAction>

// @ts-ignore
window.store = store
