import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import detailsReducer from "./reducers/detailsReducer";
import responseReducer from "./reducers/responseReducer";

const rootReducer = combineReducers({
    details: detailsReducer,
    response: responseReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
