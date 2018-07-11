import React from 'react';
import moment from 'moment';
import '../App.css';

export default function Contact (props) {
  
  let display;
  if (props.info.phone) {
    display = `(${props.info.phone.slice(0,3)}) ${props.info.phone.slice(3,6)}-${props.info.phone.slice(6)}`
  }
  return (
    <div className="contact">
      <div className="info">
        <div className="display">{props.info.name}</div>
        <div className="display">{props.info.phone ? display : 'N/A'}</div>
        <div className="display">{props.info.birthday ? moment(props.info.birthday, 'YYYY-MM-DD').format("MMM Do, YYYY") : 'N/A'}</div>
      </div>

      <div className="buttons">
        <button onClick={props.edit}>Edit</button>
        <button onClick={props.delete}>Delete</button>
      </div>
    </div>
  );

}

//props.info.birthday.split('-').reverse().join('/')