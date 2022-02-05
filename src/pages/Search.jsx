import React, { Component } from 'react';
import { Header } from '../components';

class Search extends Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input data-testid="search-artist-input" type="text" />
          <button
            data-testid="search-artist-button"
            type="button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
