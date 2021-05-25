import React from "react";
import ReactDOM from "react-dom";
import Root from "./router/RootComponent";
import { createStore, combineReducers, applyMiddleware } from "redux";
import * as reducers from "./redux";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
/* <BrowserRouter basename={"/termine-ws-react"}>/evotion/prueba-react/ */
let store = createStore(combineReducers(reducers), applyMiddleware(thunk));
const target = document.getElementById('erw-root') || document.getElementById('root');;
if (target) { ReactDOM.render(
	<Provider store={store}>
		}
		<BrowserRouter basename={"/termine-ws-react"}>
			<Root />
		</BrowserRouter>
	</Provider>,
	target
);}

