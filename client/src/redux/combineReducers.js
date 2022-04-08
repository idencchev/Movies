import { combineReducers } from "redux";
import {detailsReducer, reducer} from "./reducer"

const reducers = combineReducers({
    account: reducer,
    details: detailsReducer
});

export default reducers;