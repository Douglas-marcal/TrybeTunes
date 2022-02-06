import React, { Component } from 'react';
import { Header } from '../components';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  componentDidMount() {
    getUser().then((data) => data);
  }

  render() {
    return (
      <div data-testid="page-profile">
        <Header />
      </div>
    );
  }
}

export default Profile;
