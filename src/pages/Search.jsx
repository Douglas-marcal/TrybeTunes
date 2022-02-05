import React, { Component } from 'react';
import { Header } from '../components';
import searchAlbums from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      buttonDisabled: true,
      textFieldLetters: '',
      artists: '',
    };

    this.validateInput = this.validateInput.bind(this);
    this.requestAPI = this.requestAPI.bind(this);
  }

  requestAPI() {
    this.setState((prev) => ({
      artists: prev.textFieldLetters,
      buttonDisabled: prev.textFieldLetters.length < 2,
      textFieldLetters: '',
    }), () => {
      const { artists } = this.state;
      searchAlbums(artists).then((data) => console.log(data));
    });
  }

  validateInput({ target: { value } }) {
    this.setState(() => ({
      textFieldLetters: value,
    }), this.setState((prevState) => ({
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
            onClick={ this.requestAPI }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
