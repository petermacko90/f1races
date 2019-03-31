import React from 'react';
import './Toast.css';

const Toast = ({ show, text, type }) => {
  return (
    <div className={`toast ${show ? 'show' : ''} ${type}`}>
      {text}
    </div>
  );
}

export default Toast;
