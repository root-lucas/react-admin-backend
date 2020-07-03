import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import product from './reducers/product';
import notice from './reducers/notices';

// combineReducers将多个reducers合并到一起
const rootReducer = combineReducers({
    product,
    notice
})

export default createStore(rootReducer, compose(applyMiddleware(...[thunk])))
