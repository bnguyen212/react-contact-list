import React from 'react';
import '../App.css';

export default function Search (props) {

  return (
    <div className="contact addContact">
      <div className="info">
        <div className="display"><input type="text" onChange={e => props.search('name', e.target.value)} placeholder="Search by name" /></div>
        <div className="display"><input type="text" onChange={e => props.search('phone', e.target.value)} placeholder="Search by phone number" /></div>
        <div className="display"></div>
      </div>

      <div className="buttons"></div>
    </div>
  );
}