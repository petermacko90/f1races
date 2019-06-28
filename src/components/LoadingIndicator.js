import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const LoadingIndicator = () => {
  return (
    <div className='p10'>
      <FontAwesomeIcon icon={faSpinner} spin={true} /> Loading...
    </div>
  );
}

export default LoadingIndicator;
