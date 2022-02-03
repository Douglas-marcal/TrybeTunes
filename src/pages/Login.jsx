import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isInvalidName: true,
    };

    this.verifyName = this.verifyName.bind(this);
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
    const { isInvalidName } = this.state;
    return (
      <div data-testid="page-login">
        <input
          data-testid="login-name-input"
          type="text"
          onChange={ this.verifyName }
        />
        <button
          data-testid="login-submit-button"
          type="button"
          disabled={ isInvalidName }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
