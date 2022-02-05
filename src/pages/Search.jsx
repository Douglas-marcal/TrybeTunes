import React, { Component } from 'react';
import { Header, Loading } from '../components';
import searchAlbums from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      buttonDisabled: true,
      textFieldLetters: '',
      artists: '',
      isLoading: false,
    };

    this.validateInput = this.validateInput.bind(this);
    this.requestAPI = this.requestAPI.bind(this);
  }

  requestAPI() {
    this.setState((prev) => ({
      isLoading: true,
      artists: prev.textFieldLetters,
      buttonDisabled: prev.textFieldLetters.length < 2,
      textFieldLetters: '',
    }), () => {
      const { artists } = this.state;
      searchAlbums(artists).then((data) => {
        this.setState(() => ({
          isLoading: false,
        }));
      });
    });
  }

  validateInput({ target: { value } }) {
    this.setState(() => ({
      textFieldLetters: value,
    }), () => this.setState((prevState) => ({
      buttonDisabled: prevState.textFieldLetters.length < 2,
    })));
  }

  render() {
    const { buttonDisabled, textFieldLetters, isLoading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {
          isLoading
            ? <Loading />
            : (
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
            )
        }
      </div>
    );
  }
}

export default Search;
