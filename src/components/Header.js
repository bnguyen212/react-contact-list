import React from 'react';
import '../App.css';

export default function Header (props) {
  return (
    <div className="contact">
      <div className="header">
        <div className="display" onClick={() => props.sort('name')}><strong>Name</strong></div>
        <div className="display"><strong>Phone</strong></div>
        <div className="display" onClick={() => props.sort('birthday')}><strong>Birthday</strong></div>
      </div>
      <div className="display"></div>
    </div>
  );
}