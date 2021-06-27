import React from "react";

export default function Display(props) {
  return (
    <div
      id="display-container"
      className="row d-flex justify-content-center text-center rounded mb-3 py-0"
    >
      <div id="smallDisplay">{props.store.smallDisplay}</div>
      <div id="display">{props.store.mainDisplay}</div>
    </div>
  );
}
