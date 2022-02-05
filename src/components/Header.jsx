import React, { Component } from 'react';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
    };

    this.getUserName = this.getUserName.bind(this);
  }

  componentDidMount() {
    this.getUserName();
  }

  getUserName() {
    getUser().then(({ name }) => {
      this.setState(() => ({ name }));
    });
  }

  render() {
    const { name } = this.state;
    return (
      <header data-testid="header-component">
        <h4>{name}</h4>
      </header>
    );
  }
}

export default Header;
