import React, { useState, useEffect, useReducer, useContext } from "react";
//UseState, and the others in the brackets are called React hooks
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/input/Input";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val.includes("@"), //includes fucntion returns boolean according to the presence of the searched charecter.
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value.includes("@"),
    };
  }
  return {
    value: "",
    isValid: null,
  };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val.trim().length > 6 ? true : false,
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value.trim().length > 6 ? true : false,
    };
  }
  return {
    value: "",
    isValid: null,
  };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: false,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: false,
  });

  const authCtx = useContext(AuthContext);

  const { isValid: emailIsValid } = emailState; // destructuring method for objects with the help of alias.
  const { isValid: passwordIsValid } = passwordState;

  // useEffect(() => {
  //   //If we dont have any dependencies, the callback will run on every event on the website not empty array rather no dependencies
  //   //this is very rare only when we want to hear every activity of the user.
  //   console.log("EFFECT RUNNING");
  // });

  useEffect(() => {
    //after every change in the dependecies is changes then this callback will run.
    //this happens with every key stroke so that is really slow.
    //Debouncing with timer
    const identifier = setTimeout(() => {
      setFormIsValid(
        //when a state change is dependent on another state change then it's wise to use a function.
        //but that is available only when all the state snapshots are of the same element.
        //Edge case bei ng calling of setFormValid before the enteredPassword updates so that is a huge buggy scenario.
        //using such kind of alias optimizes the code and reduces the unnecessary execution.
        emailIsValid && passwordIsValid
      );
    }, 500);
    return () => {
      //this clears the last timer before running a new timer when the function call happens again.
      clearTimeout(identifier);
      console.log("free");
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    //the val is called payload
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    // setFormIsValid(
    //   //propblem with react scheduling state updates is bad when one state change is dependent on another state
    //   event.target.value.includes("@") && passwordState.value.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
    // setFormIsValid(
    //   emailState.value.includes("@") && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    //these are buggy scenarios in case of HTTP calls.
    //setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
    } else {
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

//useReducer used when states are interlinked and are more complex to manage with useState
//useState used in most of the cases where the state changes are independent of other states
