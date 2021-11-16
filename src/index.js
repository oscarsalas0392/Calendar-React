import React from 'react';
import ReactDOM from 'react-dom';
import { CalendarApp } from './CalendarApp';
import './styles.css'
 


console.log(process.env.REACT_APP_API_URL)
ReactDOM.render(
  <CalendarApp/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

