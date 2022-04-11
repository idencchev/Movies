import { combineReducers } from "redux";
import {
  detailsReducer,
  movieDataReducer,
  userReducer,
  loadingReducer,
} from "./reducer";

const reducers = combineReducers({
  account: userReducer,
  details: detailsReducer,
  movieData: movieDataReducer,
  loading: loadingReducer,
});

export default reducers;
