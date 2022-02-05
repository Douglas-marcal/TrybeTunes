import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isLoading: false,
    };

    this.getUserName = this.getUserName.bind(this);
  }

  componentDidMount() {
    this.getUserName();
  }

  getUserName() {
    this.setState({ isLoading: true }, () => {
      getUser().then(({ name }) => {
        this.setState(() => ({ name, isLoading: false }));
      });
    });
  }

  render() {
    const { name, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        {
          isLoading
            ? <Loading />
            : (<h4 data-testid="header-user-name">{name}</h4>)
        }
      </header>
    );
  }
}

export default Header;
