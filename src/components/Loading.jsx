import React, { Component } from 'react';
import '../styles/Loading.css';

class Loading extends Component {
  render() {
    const { isHeader } = this.props;
    return (
      isHeader
        ? (
          <h4 className="loading">
            <span className="separator">|</span>
            Carregando...
          </h4>
        ) : (
          <h1 className="loading-content">Carregando...</h1>
        )
    );
  }
}

export default Loading;
