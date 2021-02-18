import React from "react";
import ReactDOM from "react-dom";
import Root from "./router/RootComponent";
import { createStore, combineReducers, applyMiddleware } from "redux";
import * as reducers from "./redux";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

let store = createStore(combineReducers(reducers), applyMiddleware(thunk));

console.log(store)

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Root />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
