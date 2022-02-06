import React, { Component } from 'react';
import { bool } from 'prop-types';
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
          <h1 className="loading-content loading-login">Carregando...</h1>
        )
    );
  }
}

Loading.propTypes = {
  isHeader: bool,
};

Loading.defaultProps = {
  isHeader: false,
};

export default Loading;
