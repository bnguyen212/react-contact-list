import React, { Component } from 'react';
import '../App.css';

export default class CreateContact extends Component {
  state ={
    name: this.props.info.name,
    phone: this.props.info.phone,
    birthday: this.props.info.birthday
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

  componentWillReceiveProps = (nextProps) => {
    this.setState({name: nextProps.info.name, phone: nextProps.info.phone, birthday: nextProps.info.birthday})
  }
  render() {
    return (
      <div className="contact addContact">
        <div className="info">
          <div className="display"><input type="text" onChange={this.onNameChange} value={this.state.name} /></div>
          <div className="display"><input type="text" onChange={this.onPhoneChange} value={this.state.phone} /></div>
          <div className="display"><input type="date" onChange={this.onBirthdayChange} value={this.state.birthday} /></div>
        </div>

        <div className="buttons">
          <button onClick={() => this.props.update(this.state.name, this.state.phone, this.state.birthday)}>Update</button>
          <button onClick={this.props.cancel}>Cancel</button>
        </div>
      </div>
    );
  }
}