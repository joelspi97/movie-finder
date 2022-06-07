import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import listReducer from './reducers/listReducer';
import detailsReducer from './reducers/detailsReducer';
import responseReducer from './reducers/responseReducer';
import voteReducer from './reducers/voteReducer';

const rootReducer = combineReducers({
    list: listReducer,
    details: detailsReducer,
    response: responseReducer,
    vote: voteReducer
});

export default createStore(rootReducer, applyMiddleware(thunk));
