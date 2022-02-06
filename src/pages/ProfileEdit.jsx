import React, { Component } from 'react';
import { Header, Loading } from '../components';
import { getUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      userInfo: {},
    };

    this.updateInfos = this.updateInfos.bind(this);
  }

  componentDidMount() {
    getUser().then((userInfo) => {
      const { name, email, image, description } = userInfo;
      this.setState({ name, email, image, description, isLoading: false });
    });
  }

  updateInfos({ target: { value, name } }) {
    this.setState(() => ({ [name]: value }));
  }

  render() {
    const { isLoading, name, email } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {
          isLoading ? <Loading /> : (
            <form>
              <input
                data-testid="edit-input-name"
                type="text"
                name="name"
                value={ name }
                onChange={ this.updateInfos }
                placeholder="Nome"
              />

              <input
                data-testid="edit-input-email"
                type="text"
                name="email"
                value={ email }
                onChange={ this.updateInfos }
                placeholder="E-mail"
              />

            </form>
          )
        }
      </div>
    );
  }
}

export default ProfileEdit;
