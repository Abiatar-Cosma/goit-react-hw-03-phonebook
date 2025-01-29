import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import styles from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
    countryCode: '+40', // Prefix implicit pentru România
  };

  // ✅ Lista de prefixe trebuie definită în interiorul clasei
  countryCodes = [
    { code: '+40', country: 'RO' },
    { code: '+49', country: 'DE' },
    { code: '+33', country: 'FR' },
    { code: '+39', country: 'IT' },
    { code: '+34', country: 'ES' },
    { code: '+44', country: 'UK' },
    { code: '+43', country: 'AT' },
    { code: '+32', country: 'BE' },
    { code: '+359', country: 'BG' },
    { code: '+385', country: 'HR' },
    { code: '+357', country: 'CY' },
    { code: '+420', country: 'CZ' },
    { code: '+45', country: 'DK' },
    { code: '+372', country: 'EE' },
    { code: '+358', country: 'FI' },
    { code: '+30', country: 'GR' },
    { code: '+36', country: 'HU' },
    { code: '+354', country: 'IS' },
    { code: '+353', country: 'IE' },
    { code: '+370', country: 'LT' },
    { code: '+371', country: 'LV' },
    { code: '+352', country: 'LU' },
    { code: '+356', country: 'MT' },
    { code: '+31', country: 'NL' },
    { code: '+47', country: 'NO' },
    { code: '+48', country: 'PL' },
    { code: '+351', country: 'PT' },
    { code: '+423', country: 'LI' },
    { code: '+386', country: 'SI' },
    { code: '+421', country: 'SK' },
    { code: '+46', country: 'SE' },
    { code: '+41', country: 'CH' },
    { code: '+380', country: 'UA' }
  ];

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleCountryChange = (e) => {
    this.setState({ countryCode: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, number, countryCode } = this.state;

    // ✅ Adăugăm automat prefixul internațional
    const formattedNumber = `${countryCode} ${number.trim().replace(/^0+/, '')}`;

    this.props.onSubmit({ id: nanoid(), name, number: formattedNumber });
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number, countryCode } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}></label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter full name"
            value={name}
            onChange={this.handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="number" className={styles.label}></label>
          <div className={styles.numberInputContainer}>
            {/* ✅ Dropdown pentru selectarea țării */}
            <select
              name="countryCode"
              value={countryCode}
              onChange={this.handleCountryChange}
              className={styles.select}
            >
              {this.countryCodes.map(({ code, country }) => (
                <option key={code} value={code}>
                  {country} {code}
                </option>
              ))}
            </select>

            {/* ✅ Input pentru numărul de telefon */}
            <input
              type="tel"
              name="number"
              id="number"
              placeholder="Enter phone number"
              value={number}
              onChange={this.handleChange}
              pattern="\d{6,15}"
              title="Phone number must contain only digits."
              required
              className={styles.numberInput}
            />
          </div>
        </div>

        <button type="submit" className={styles.button}>Add contact</button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
