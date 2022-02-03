import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div data-testid="page-login">
        <input data-testid="login-submit-input" type="text" />
        <button data-testid="login-submit-button" type="button">Entrar</button>
      </div>
    );
  }
}

export default Login;
