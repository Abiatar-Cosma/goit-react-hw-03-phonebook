import React, { Component } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import styles from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (newContact) => {
    const { contacts } = this.state;

    if (contacts.some((contact) => contact.name === newContact.name)) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }

    if (contacts.some((contact) => contact.number === newContact.number)) {
      alert(`The number ${newContact.number} is already in contacts.`);
      return;
    }

    this.setState((prevState) => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };
  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <div className={styles["app-container"]}>
    <div className={styles["camera-hole"]}></div> {/* Gaura camerei */}
    <div className={styles["screen"]}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={this.addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={this.changeFilter} />
      <ContactList contacts={filteredContacts} onDeleteContact={this.deleteContact} />
    </div>
  </div>
    );
  }
}

export default App;
