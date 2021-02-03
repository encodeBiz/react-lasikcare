import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import Root from "./router/RootComponent";
import { createStore, combineReducers } from "redux";
import * as reducers from "./redux";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";

let store = createStore(combineReducers(reducers));
const history = createBrowserHistory();

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter history={history}>
			<Root />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
