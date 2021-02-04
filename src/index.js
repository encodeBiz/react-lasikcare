import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import Root from "./router/RootComponent";
import { createStore, combineReducers, applyMiddleware } from "redux";
import * as reducers from "./redux";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

let store = createStore(combineReducers(reducers), applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Root />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
