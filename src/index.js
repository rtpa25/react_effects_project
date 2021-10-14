import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

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
