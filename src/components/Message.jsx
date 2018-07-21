import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/index.css';

export default function Message(props) {
  const { message, className } = props;
  return (
    <div className={`${styles.message} ${className}`}>
      <div>
        { message }
      </div>
    </div>
  );
}

Message.propTypes = {
  message: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};
