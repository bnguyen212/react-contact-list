import React, { Component } from 'react';
import '../App.css';

export default class CreateContact extends Component {
  state = {
    name: '',
    phone: '',
    birthday: ''
  }

  onNameChange = (e) => {
    this.setState({name: e.target.value})
  }

  onPhoneChange = (e) => {
    this.setState({phone: e.target.value})
  }

  onBirthdayChange = (e) => {
    this.setState({birthday: e.target.value})
  }

  handleSubmit = () => {
    this.props.add(this.state.name, this.state.phone, this.state.birthday);
    this.setState({name: '', phone: '', birthday: ''})
  }
  render() {
    return (
      <div className="contact addContact">
        <div className="info">
          <div className="display"><input type="text" onChange={this.onNameChange} placeholder="Contact Name" value={this.state.name} /></div>
          <div className="display"><input type="text" onChange={this.onPhoneChange} placeholder="10 Digits (no space)" value={this.state.phone} /></div>
          <div className="display"><input type="date" onChange={this.onBirthdayChange} value={this.state.birthday}/></div>
        </div>

        <div className="buttons">
          <button onClick={this.handleSubmit}>Add</button>
        </div>
      </div>
    );
  }
}