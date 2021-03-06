import "./App.css";
import React, { useReducer, useEffect } from "react";
import Buttons from "./Buttons.js";
import Display from "./Display.js";

export const ACTIONS = {
  ADD_NUMBER: "add-number",
  CLEAR_LINE: "clear-line",
  DELETE: "delete",
  ADD_OPERATOR: "add-operator",
  ADD_DECIMAL: "add-decimal",
  CALCULATE: "calculate",
};
export const NUMS = [
  { val: 1, word: "one" },
  { val: 2, word: "two" },
  { val: 3, word: "three" },
  { val: 4, word: "four" },
  { val: 5, word: "five" },
  { val: 6, word: "six" },
  { val: 7, word: "seven" },
  { val: 8, word: "eight" },
  { val: 9, word: "nine" },
  { val: 0, word: "zero" },
];

export const OPERATORS = [
  { val: "+", word: "add" },
  { val: "-", word: "subtract" },
  { val: "*", word: "multiply" },
  { val: "/", word: "divide" },
];
const op_arr = OPERATORS.map((el) => el.val);
const START_DISPLAY = "Enter a value";

const reducer = (store, action) => {
  let mainDisplay = store.mainDisplay;
  let smallDisplay = store.smallDisplay;
  let displayedIsResult = store.displayedIsResult;
  if (mainDisplay === START_DISPLAY) {
    mainDisplay = "0";
  }
  if (mainDisplay.includes("Infinity") || mainDisplay.includes("NaN")) {
    mainDisplay = "0";
  }
  switch (action.type) {
    case ACTIONS.ADD_NUMBER:
      if (mainDisplay === "0") {
        return { ...store, mainDisplay: String(action.payload) };
      } else if (op_arr.includes(mainDisplay[0])) {
        smallDisplay += mainDisplay;
        mainDisplay = String(action.payload);
        return {
          ...store,
          mainDisplay: mainDisplay,
          smallDisplay: smallDisplay,
        };
      } else {
        mainDisplay += String(action.payload);
        return { ...store, mainDisplay: mainDisplay };
      }
    case ACTIONS.CLEAR_LINE:
      return { ...store, mainDisplay: "0", smallDisplay: "" };
    case ACTIONS.DELETE:
      if (mainDisplay.length === 1) {
        mainDisplay = "0";
      } else {
        mainDisplay = mainDisplay.slice(0, mainDisplay.length - 1);
      }
      return { ...store, mainDisplay: mainDisplay };
    case ACTIONS.ADD_OPERATOR:
      if (displayedIsResult) {
        smallDisplay = mainDisplay;
        mainDisplay = action.payload;
        displayedIsResult = false;
      } else {
        if (op_arr.includes(mainDisplay[0])) {
          if (action.payload === "-") {
            mainDisplay += action.payload;
          } else {
            mainDisplay = action.payload;
          }
        } else {
          smallDisplay += mainDisplay;
          mainDisplay = action.payload;
        }
      }
      return {
        ...store,
        mainDisplay: mainDisplay,
        smallDisplay: smallDisplay,
        displayedIsResult: displayedIsResult,
      };
    case ACTIONS.ADD_DECIMAL:
      if (mainDisplay.includes(".")) {
        return store;
      }
      mainDisplay += ".";
      return { ...store, mainDisplay: mainDisplay };
    case ACTIONS.CALCULATE:
      if (op_arr.includes(mainDisplay)) {
        mainDisplay = "";
      }
      smallDisplay += mainDisplay; //eslint-disable-next-line
      let result = String(eval(smallDisplay));
      smallDisplay = "";
      return {
        ...store,
        mainDisplay: result,
        smallDisplay: smallDisplay,
        displayedIsResult: true,
      };
    default:
      return store;
  }
};

function App() {
  const [store, dispatch] = useReducer(reducer, {
    mainDisplay: START_DISPLAY,
    smallDisplay: "",
    displayedIsResult: false,
  });

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      let numsvals = NUMS.map((el) => String(el.val));
      let operatorsvals = OPERATORS.map((el) => String(el.val));
      if (numsvals.includes(event.key)) {
        dispatch({ type: ACTIONS.ADD_NUMBER, payload: event.key });
      } else if (operatorsvals.includes(event.key)) {
        dispatch({ type: ACTIONS.ADD_OPERATOR, payload: event.key });
      } else if (event.key === "." || event.key === ",") {
        dispatch({ type: ACTIONS.ADD_DECIMAL, payload: undefined });
      } else if (event.key === "Enter") {
        dispatch({ type: ACTIONS.CALCULATE, payload: undefined });
      } else if (event.key === "Backspace" || event.key === "Delete") {
        dispatch({ type: ACTIONS.DELETE, payload: undefined });
      } else if (event.key === "Escape") {
        dispatch({ type: ACTIONS.CLEAR_LINE, payload: undefined });
      }
    });
  }, []);

  return (
    <div className="App justify-content-center p-4 rounded text-light d-flex flex-column">
      <Display store={store} dispatch={dispatch}></Display>
      <Buttons store={store} dispatch={dispatch}></Buttons>
    </div>
  );
}

export default App;
