import React from 'react';
import {render} from 'react-dom';
import './styles/index.css';


import { Router, Route } from 'react-router';
import Root from './router/root.component';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from './redux'



let store = createStore(combineReducers(reducers))

render(
  <Root store={store} />,
  document.getElementById('root')
)

