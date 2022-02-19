import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Header, Loading, NavBar } from '../components';
import { getUser, updateUser } from '../services/userAPI';
import '../styles/ProfileEdit.css';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      isDisabled: true,
    };

    this.updateInfos = this.updateInfos.bind(this);
    this.checkButton = this.checkButton.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  componentDidMount() {
    getUser().then((userInfo) => {
      const { name, email, image, description } = userInfo;
      this.setState({ name, email, image, description, isLoading: false }, () => {
        this.checkButton();
      });
    });
  }

  checkButton() {
    const { name, email, image, description } = this.state;
    if (
      name.length > 0
      && (email.length > 0 && email.includes('@'))
      && image.length > 0
      && description.length > 0
    ) {
      this.setState({ isDisabled: false });
    } else this.setState({ isDisabled: true });
  }

  saveChanges() {
    const { name, email, image, description } = this.state;
    this.setState({ isLoading: true }, () => {
      updateUser({ name, email, image, description }).then(() => {
        this.setState({ redirect: true });
      });
    });
  }

  updateInfos({ target: { value, name } }) {
    this.setState(() => ({ [name]: value }), () => this.checkButton());
  }

  render() {
    const {
      isLoading,
      name,
      email,
      description,
      image,
      isDisabled,
      redirect,
    } = this.state;

    if (redirect) return (<Redirect to="/profile" />);

    return (
      <div className="page-profile-edit">
        <Header />
        <NavBar />

        {
          isLoading ? <Loading /> : (
            <div data-testid="page-profile-edit" className="profile-edit">
              <form className="form-edit-container" onSubmit={ this.saveChanges }>

                <div className="image-url-container">
                  <img
                    src={ image }
                    alt={ `Foto de ${name}` }
                    className="profile-image"
                  />
                  <label htmlFor="image" className="label-image">
                    URL da imagem:
                    <input
                      data-testid="edit-input-image"
                      type="text"
                      name="image"
                      value={ image }
                      onChange={ this.updateInfos }
                      placeholder="Insira a URL da imagem"
                      className="input-image"
                    />
                  </label>
                </div>

                <label htmlFor="name">
                  Nome:
                  <input
                    data-testid="edit-input-name"
                    type="text"
                    name="name"
                    id="name"
                    value={ name }
                    onChange={ this.updateInfos }
                    placeholder="Nome"
                    className="input-100"
                  />
                </label>
                <br />

                <label htmlFor="email">
                  Email:
                  <input
                    data-testid="edit-input-email"
                    type="text"
                    name="email"
                    value={ email }
                    onChange={ this.updateInfos }
                    placeholder="E-mail"
                    className="input-100"
                  />
                </label>
                <br />

                <label htmlFor="description">
                  Descrição:
                  <textarea
                    data-testid="edit-input-description"
                    placeholder="Descrição"
                    value={ description }
                    onChange={ this.updateInfos }
                    name="description"
                    id="description"
                    cols="20"
                    rows="5"
                    className="input-100 description"
                  />

                </label>
                <br />

                <button
                  data-testid="edit-button-save"
                  type="submit"
                  disabled={ isDisabled }
                  className="button-save-profile"
                >
                  Salvar Alterações
                </button>

              </form>

            </div>
          )
        }

      </div>
    );
  }
}

export default ProfileEdit;
