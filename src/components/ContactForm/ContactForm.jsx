import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import styles from './ContactForm.module.css';

class ContactForm extends Component {
    state = {
      name: '',
      number: '',
      prefix: '+40', // Prefix implicit
    };
  
    handleChange = (e) => {
      const { name, value } = e.target;
  
      if (name === 'number') {
        const sanitizedNumber = value.replace(this.state.prefix, '').trim();
        this.setState({ number: sanitizedNumber });
      } else {
        this.setState({ [name]: value });
      }
    };
  
    handlePrefixChange = (e) => {
      this.setState({ prefix: e.target.value });
    };
  
    handleSubmit = (e) => {
      e.preventDefault();
      const { name, number, prefix } = this.state;
  
      const formattedNumber = `${prefix}${number.trim().replace(/^0+/, '')}`;
      this.props.onSubmit({ id: nanoid(), name, number: formattedNumber });
      this.setState({ name: '', number: '' });
    };
  
    render() {
      const { name, number, prefix } = this.state;
  
      return (
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter full name"
              value={name}
              onChange={this.handleChange}
              pattern="^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces."
              required
              className={styles.input}
            />
          </div>
  
          <div className={styles.inputGroup}>
            <label htmlFor="number" className={styles.label}>Phone Number</label>
            <div className={styles.numberInputContainer}>
              <select
                name="prefix"
                id="prefix"
                value={prefix}
                onChange={this.handlePrefixChange}
                className={styles.select}
              >
                <option value="+40">🇷🇴 +40</option>
                <option value="+49">🇩🇪 +49</option>
                <option value="+33">🇫🇷 +33</option>
                <option value="+39">🇮🇹 +39</option>
                <option value="+34">🇪🇸 +34</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+1">🇺🇸 +1</option>
              </select>
              <input
                type="tel"
                name="number"
                id="number"
                placeholder="Enter phone number"
                value={`${prefix}${number}`}
                onChange={this.handleChange}
                pattern="\+?\d{1,15}"
                title="Phone number must be in international format or contain only digits."
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