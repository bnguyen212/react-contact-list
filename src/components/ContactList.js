import React from 'react';
import Contact from './Contact';
import Header from './Header';
import '../App.css';

export default function ContactList (props) {
    return (
      <div className="container">
        <h1 className="App-header">Brian's Contact List</h1>
        { props.contacts.length > 0 ? <Header sort={props.sort} sortBy={props.sortBy} sortReverse={props.sortReverse} /> : <h3>No contacts to display...</h3> }
        { props.contacts.map(contact => <Contact key={contact._id}
                                                 info={contact}
                                                 delete={() => props.delete(contact._id)} 
                                                 edit={() => props.edit(contact._id)}
                                                  />) }
      </div>
    );
}