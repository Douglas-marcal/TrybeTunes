import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Header, Loading } from '../components';
import { getUser, updateUser } from '../services/userAPI';

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
      <div>
        <Header />

        {
          isLoading ? <Loading /> : (
            <div data-testid="page-profile-edit">
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

                <input
                  data-testid="edit-input-description"
                  type="text"
                  name="description"
                  value={ description }
                  onChange={ this.updateInfos }
                  placeholder="Descrição"
                />

                <input
                  data-testid="edit-input-image"
                  type="text"
                  name="image"
                  value={ image }
                  onChange={ this.updateInfos }
                  placeholder="Imagem"
                />

                <button
                  data-testid="edit-button-save"
                  type="button"
                  onClick={ this.saveChanges }
                  disabled={ isDisabled }
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
