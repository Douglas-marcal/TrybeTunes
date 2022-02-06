import React, { Component } from 'react';
import '../styles/Loading.css';

class Loading extends Component {
  render() {
    return (
      <h4 className="loading">
        <span className="separator">|</span>
        Carregando...
      </h4>
    );
  }
}

export default Loading;
