import React, { Component } from 'react';
import { Header } from '../components';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      buttonDisabled: true,
      textFieldLetters: '',
    };

    this.validateInput = this.validateInput.bind(this);
  }

  validateInput({ target: { value } }) {
    this.setState(() => ({
      textFieldLetters: value,
    }), () => this.setState((prevState) => ({
      buttonDisabled: prevState.textFieldLetters.length < 2,
    })));
  }

  render() {
    const { buttonDisabled, textFieldLetters } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            value={ textFieldLetters }
            onChange={ this.validateInput }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ buttonDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
