import React from 'react';
import '../App.css';

export default function Header (props) {
  return (
    <div className="contact">
      <div className="header">
        <div className="display" onClick={() => props.sort('name')}><strong>Name</strong> {props.sortBy === 'name' ? (props.sortReverse ? <span>&darr;</span> : <span>&uarr;</span>) : null}</div>
        <div className="display"><strong>Phone</strong></div>
        <div className="display" onClick={() => props.sort('birthday')}><strong>Birthday</strong>  {props.sortBy === 'birthday' ? (props.sortReverse ? <span>&darr;</span> : <span>&uarr;</span>) : null}</div>
      </div>
      <div className="display"></div>
    </div>
  );
}