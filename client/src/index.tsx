import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'; // Redux의 Store를 지속적으로 추적(React가
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import App from "./App";
import reducers from "./reducers"
import './index.css';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core';



const store = createStore(reducers, compose(applyMiddleware(thunk)))
// Redux의 고유 객체 - 아직 React랑 연결된 것이 아니다.

ReactDOM.render(
  <Provider store={store}><ThemeProvider theme={createTheme()}><App /></ThemeProvider></Provider>, document.getElementById("root"));
