import React, { Component } from 'react';
import CreateContact from './components/CreateContact';
import ContactList from './components/ContactList';
import EditContact from './components/EditContact';
import Search from './components/Search';
import _ from 'underscore';
import './App.css';

class App extends Component {
  state = {
    contacts: [],
    edit: null,
    sortBy: 'name',
    sortReverse: false
  }

  componentWillMount = () => {
    fetch('/contacts')
    .then(res => res.json())
    .then(contacts => this.setState({contacts}))
    .catch(err => console.log(err))
  }

  deleteContact = (id) => {
    fetch('/contacts/' + id, { method: 'DELETE' })
    .then(res => res.json())
    .then(contact => {
      if (contact) {
        let copy = this.state.contacts.slice();
        const index = copy.findIndex(contact => contact._id === id);
        copy.splice(index, 1);
        this.setState({contacts: copy})
      } else {
        alert('Failed to delete contact :(')
      }
    })
    .catch(err => console.log(err))
  }

  addContact = (name, phone, birthday) => {
    if (!name) { return alert('Contact name is missing!') }
    if ((birthday && !phone) || (/^[0-9]+$/.test(phone) && phone.length > 9)) {
      fetch('/contacts/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, phone, birthday })
      })
      .then(res => res.json())
      .then(contact => {
        if (contact) {
          this.setState({contacts: this.state.contacts.concat(contact)})
        } else {
          alert('Failed to add contact :(')
        }
      })
      .catch(err => console.log(err))
    } else { 
      return alert('Must have a valid phone number or birthday!') 
    }
  }

  editContact = (id) => {
    this.setState({edit: id})
  }

  updateContact = (name, phone, birthday) => {
    if (!name) { return alert('Contact name is missing!') }
    if ((birthday && !phone) || (/^[0-9]+$/.test(phone) && phone.length === 10)) {
      fetch('/contacts/' + this.state.edit, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, phone, birthday })
      })
      .then(res => res.json())
      .then(contactNew => {
        if (contactNew) {
          let copy = this.state.contacts.slice();
          const index = copy.findIndex(contact => contact._id === contactNew._id);
          copy.splice(index, 1, contactNew);
          this.setState({contacts: copy, edit: null})
        } else {
          alert('Failed to add contact :(')
        }
      })
      .catch(err => console.log(err))
    } else { 
      return alert('Must have a valid phone number or birthday!') 
    }
  }

  searchContact = (type, query) => {
    if (type === 'name') {
      this.setState({nameSearch: query})
    } else {
      this.setState({phoneSearch: query})
    }
  }

  sortContact = (type) => {
    if (this.state.sortBy === type) {
      this.setState({sortReverse: !this.state.sortReverse})
    } else {
      this.setState({sortBy: type, sortReverse: false})
    } 
  }

  render() {
    let index = this.state.contacts.findIndex(contact => contact._id === this.state.edit);
    let contacts = this.state.contacts.slice();

    //filter by name
    if (this.state.nameSearch) {
      contacts = contacts.filter(contact => contact.name.toUpperCase().indexOf(this.state.nameSearch.toUpperCase()) !== -1)
    }

    //filter by number
    if (this.state.phoneSearch) {
      contacts = contacts.filter(contact => contact.phone.indexOf(this.state.phoneSearch) !== -1)
    }

    //sort by name
    if (this.state.sortBy === 'name') {
      contacts = contacts.sort((a, b) => {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    }

    //sort by birthday
    if (this.state.sortBy === 'birthday') {
      contacts = _.sortBy(contacts, 'birthday')
    }

    //sort direction
    if (this.state.sortReverse) {
      contacts = contacts.reverse();
    }

    return (
      <div className="App">
        <ContactList contacts={contacts}
                     delete={this.deleteContact}
                     edit={this.editContact}
                     sort={this.sortContact}
                     sortBy={this.state.sortBy}
                     sortReverse={this.state.sortReverse} />
        {!this.state.edit ? <CreateContact add={this.addContact} /> : <EditContact info={this.state.contacts[index]} update={this.updateContact} cancel={() => this.editContact(null)}/>}
        <Search search={this.searchContact} /> 
      </div>
    );
  }
}

export default App;
