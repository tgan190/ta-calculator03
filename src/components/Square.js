import React from 'react';

  function Square(props) {
    let xclasses = "square";
    if (props.value === '=') {
      xclasses = "square double"
    }
    
    return (
      <button className={xclasses} onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

  export default Square;
  