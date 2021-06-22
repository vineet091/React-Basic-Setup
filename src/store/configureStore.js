import { createStore, compose, applyMiddleware } from "redux";
import { default as reduxThunk } from "redux-thunk";
import { middleware as reduxPack } from "redux-pack";
// import apiService from "./services/apiService";
import rootReducer from "../reducers/index";

const CreateStore = ({ isBrowser, initialState = {} }) => {
  const checkTokenExpirationMiddleware = store => next => action => {
    const {
      $home: { title }
    } = store.getState();
    console.log("title", title);
    next(action);
  };

  // const middlewares = [];
  const composeEnhancers =
    (isBrowser && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  const middlewares = [
    // reduxThunk.withExtraArgument({ api: apiService, history }),
    reduxPack
  ].filter(Boolean);

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(...middlewares, checkTokenExpirationMiddleware)
    )
  );

  return store;
};

export default CreateStore;
