import React from 'react';

const Toast = ({ show, text }) => {
  return (
    <div className={"toast" + (show ? ' show' : '')}>
      {text}
    </div>
  );
}

export default Toast;
