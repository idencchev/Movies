import { combineReducers } from "redux";
import reducer from "./reducer"

const reducers = combineReducers({
    account: reducer
});

export default reducers;