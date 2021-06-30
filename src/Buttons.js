import React, { useEffect } from "react";
import { ACTIONS, OPERATORS, NUMS } from "./App.js";

const Buttons = (props) => {
  useEffect(() => {
    let otherIDs = [
      { word: "clear" },
      { word: "delete" },
      { word: "decimal" },
      { word: "equals" },
    ];
    let joinedArray = NUMS.concat(OPERATORS);
    joinedArray = joinedArray.concat(otherIDs);
    for (let elem of joinedArray) {
      let button = document.getElementById(elem.word);
      button.style.gridArea = elem.word;
    }
  });

  return (
    <React.Fragment>
      <div className="row grid-container">
        <div id="buttons-grid">
          <button
            id="clear"
            className="btn btn-danger"
            onClick={() =>
              props.dispatch({ type: ACTIONS.CLEAR_LINE, payload: undefined })
            }
          >
            AC
          </button>
          <button
            id="delete"
            className="btn btn-danger"
            onClick={() =>
              props.dispatch({ type: ACTIONS.DELETE, payload: undefined })
            }
          >
            <i className="bi bi-backspace"></i>
          </button>
          {NUMS.map((elem) => {
            return (
              <React.Fragment key={elem.word}>
                <button
                  id={elem.word}
                  className="btn btn-primary"
                  onClick={() =>
                    props.dispatch({
                      type: ACTIONS.ADD_NUMBER,
                      payload: elem.val,
                    })
                  }
                >
                  {elem.val}
                </button>
              </React.Fragment>
            );
          })}
          {OPERATORS.map((elem) => {
            return (
              <React.Fragment key={elem.val}>
                <button
                  id={elem.word}
                  className="btn btn-secondary"
                  onClick={() =>
                    props.dispatch({
                      type: ACTIONS.ADD_OPERATOR,
                      payload: elem.val,
                    })
                  }
                >
                  {elem.val}
                </button>
              </React.Fragment>
            );
          })}
          <button
            id="decimal"
            className="btn btn-dark"
            onClick={() => {
              props.dispatch({ type: ACTIONS.ADD_DECIMAL, payload: undefined });
            }}
          >
            .
          </button>
          <button
            id="equals"
            className="btn btn-success"
            onClick={() => {
              props.dispatch({ type: ACTIONS.CALCULATE, payload: undefined });
            }}
          >
            =
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Buttons;
