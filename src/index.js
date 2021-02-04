import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import Root from "./router/RootComponent";
import { createStore, combineReducers, applyMiddleware } from "redux";
import * as reducers from "./redux";
import { Router } from "react-router";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

let store = createStore(combineReducers(reducers), applyMiddleware(thunk));
const history = createBrowserHistory();

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Root />
		</Router>
	</Provider>,
	document.getElementById("root")
);
