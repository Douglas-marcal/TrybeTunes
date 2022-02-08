import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header, Loading } from '../components';
import { getUser } from '../services/userAPI';
import '../styles/Profile.css';

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
      <div className="container-page-profile">
        <Header />

        {
          isLoading ? <Loading /> : (
            <div data-testid="page-profile" className="page-profile">

              <img
                data-testid="profile-image"
                src={ userInfo.image }
                alt={ `Foto de ${userInfo.name}` }
              />

              <Link to="/profile/edit">
                <button
                  type="button"
                  className="button-edit-profile"
                >
                  Editar perfil
                </button>

              </Link>

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
