import React from 'react';

const Toast = ({ show, text, type }) => {
  return (
    <div className={`toast ${show ? 'show' : ''} ${type}`}>
      {text}
    </div>
  );
}

export default Toast;
