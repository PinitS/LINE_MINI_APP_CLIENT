import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { thunk } from "redux-thunk";

import rootReducer from "@redux/reducers";

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
