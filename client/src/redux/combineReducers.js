import { combineReducers } from "redux";
import { detailsReducer, movieDataReducer, reducer } from "./reducer";

const reducers = combineReducers({
  account: reducer,
  details: detailsReducer,
  movieData: movieDataReducer,
});

export default reducers;
