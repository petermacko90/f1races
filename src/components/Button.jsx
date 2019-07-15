import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import PropTypes from 'prop-types';
import './Button.css';

export default function Button({
  onClick, classes, disabled, children, title
}) {
  const theme = useContext(ThemeContext);

  return (
    <button
      type="button"
      className={`button bg-${theme} b-${theme} ${classes}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.array
  ]).isRequired,
  title: PropTypes.string
};
