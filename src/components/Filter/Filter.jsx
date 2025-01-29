import React from 'react';
import PropTypes from 'prop-types';
import styles from './Filter.module.css';

const Filter = ({ value, onChange }) => (
    <div className={styles['filter-container']}>
    <input
      type="text"
      className={styles.input}
      value={value}
      onChange={onChange}
      placeholder="Search contacts..."
    />
  </div>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
