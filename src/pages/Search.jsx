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
      responseAPI: false,
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
          responseAPI: true,
          albums: data,
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
    const {
      buttonDisabled,
      textFieldLetters,
      isLoading,
      artists,
      responseAPI,
      albums,
    } = this.state;
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

        {
          responseAPI && (
            <div>
              <h3>{`Resultado de álbuns de: ${artists}`}</h3>
              <div>
                {
                  albums.map((album) => (
                    <div key={ album.collectionId }>
                      <h3>{album.artistName}</h3>
                      <h5>{album.collectionName}</h5>
                      <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                    </div>
                  ))
                }
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

export default Search;
