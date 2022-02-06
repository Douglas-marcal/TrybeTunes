import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import { Loading } from '../components';
import '../styles/Login.css';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isInvalidName: true,
      isLoading: false,
      redirect: false,
    };

    this.onClickButtonLogin = this.onClickButtonLogin.bind(this);
    this.verifyName = this.verifyName.bind(this);
  }

  onClickButtonLogin() {
    const { name } = this.state;
    this.setState(() => ({
      isLoading: true,
    }), () => createUser({ name }).then(() => {
      this.setState(() => ({
        redirect: true,
      }));
    }));
  }

  verifyName({ target: { value } }) {
    this.setState(() => ({
      name: value,
    }), () => this.setState((prevState) => {
      const MIN_CHARACTERS = 3;
      if (prevState.name.length >= MIN_CHARACTERS) {
        return { isInvalidName: false };
      }
      return { isInvalidName: true };
    }));
  }

  render() {
    const { isInvalidName, isLoading, redirect } = this.state;
    return (
      <div data-testid="page-login" className="container-login">
        {
          redirect && <Redirect to="/search" />
        }
        {
          isLoading ? <Loading /> : (
            <div>

              <h1>Aqui só toca SUCESSO!</h1>

              <form className="form-container">
                <input
                  data-testid="login-name-input"
                  type="text"
                  id="name-input"
                  className="name-input"
                  placeholder="Nome"
                  onChange={ this.verifyName }
                />

                <button
                  data-testid="login-submit-button"
                  type="button"
                  className="submit-button"
                  disabled={ isInvalidName }
                  onClick={ this.onClickButtonLogin }
                >
                  Entrar
                </button>

              </form>

            </div>

          )
        }
      </div>
    );
  }
}

export default Login;
