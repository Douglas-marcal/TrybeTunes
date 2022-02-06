import React, { Component } from 'react';
import { Header, Loading } from '../components';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      userInfo: {},
    };
  }

  componentDidMount() {
    getUser().then((userInfo) => {
      this.setState({ userInfo, isLoading: false });
    });
  }

  render() {
    const { userInfo, isLoading } = this.state;
    return (
      <div>
        <Header />

        {
          isLoading ? <Loading /> : (
            <div data-testid="page-profile">

              <img
                data-testid="profile-image"
                src={ userInfo.image }
                alt={ `Foto de ${userInfo.name}` }
              />

              <p>
                <span>Nome: </span>
                {userInfo.name}
              </p>
              <p>
                <span>E-mail: </span>
                {userInfo.email}
              </p>
              <p>
                <span>Descrição: </span>
                {userInfo.description}
              </p>
            </div>

          )
        }

      </div>

    );
  }
}

export default Profile;
