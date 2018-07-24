import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Message.css';

export default function Message({ message }) {
  const className = message ? styles.messageShown : styles.messageHidden;
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
};
