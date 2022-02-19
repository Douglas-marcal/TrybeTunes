import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header, Loading, NavBar } from '../components';
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
        <NavBar />

        {
          isLoading ? <Loading /> : (
            <div data-testid="page-profile" className="page-profile">
              <div className="image-button-container">
                {
                  userInfo.image
                    ? (
                      <img
                        data-testid="profile-image"
                        src={ userInfo.image }
                        alt={ `Foto de ${userInfo.name}` }
                        className="profile-image"
                      />
                    )
                    : (
                      <img
                        data-testid="profile-image"
                        src="https://cdn.pixabay.com/photo/2016/03/31/14/47/avatar-1292817_1280.png"
                        alt={ `Foto de ${userInfo.name}` }
                        className="profile-image"
                      />
                    )
                }

                <Link to="/profile/edit">
                  <button
                    type="button"
                    className="button-edit-profile"
                  >
                    Editar perfil
                  </button>

                </Link>
              </div>
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
