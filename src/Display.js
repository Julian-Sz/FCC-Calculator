import React from "react";

export default function Display(props) {
  return (
    <div id="display" className="row d-flex justify-content-center text-center">
      <div id="smallDisplay">{props.store.smallDisplay}</div>
      <div id="display">{props.store.mainDisplay}</div>
    </div>
  );
}
