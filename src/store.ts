import { createStore } from "redux";
import moviesReducer from "./reducers";
export default createStore(moviesReducer);
