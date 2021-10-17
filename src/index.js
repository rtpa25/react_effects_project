import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import { AuthcontextProvider } from "./store/auth-context";

ReactDOM.render(
  <AuthcontextProvider>
    <App />
  </AuthcontextProvider>,
  document.getElementById("root")
);

//What is an Effect in React

//The main job of react is to render the UI and handle user interation
//Evaluate and render JSX code mage states and props Re-ecaluate components on change in state
//All other actions like api calls to server and basically anything other than UI and state
//Are called side-effects or effects like storing data in local storage, timers and intervals
//HTTTP requests and all such are called side-effects or effects
//These must happen outside component fucntions because they re-run on state changes
//There is also a possiblity of infinite looping and bugs if side effects are written directly
//inside component functions
//useEffect(()=>{...}, [dependencies]) the callback execute only when the dependencies change

//rules for hooks
//React hooks can be used in inbuilt React component functions that returns JSX code
// there are custome hooks that can be used anywhere
//hooks can't be used in any nesting and only call them at the top level.
//useEffect always add everything that you put in it as a dependencies leaving the default functions
