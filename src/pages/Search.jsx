import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header, Loading } from '../components';
import searchAlbums from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      artists: '',
      buttonDisabled: true,
      isLoading: false,
      responseAPI: false,
      textFieldLetters: '',
    };

    this.validateInput = this.validateInput.bind(this);
    this.requestAPI = this.requestAPI.bind(this);
  }

  requestAPI() {
    this.setState(({ textFieldLetters }) => ({
      isLoading: true,
      artists: textFieldLetters,
      buttonDisabled: textFieldLetters.length < 2,
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
    }), () => this.setState(({ textFieldLetters }) => ({
      buttonDisabled: textFieldLetters.length < 2,
    })));
  }

  render() {
    const {
      albums,
      artists,
      buttonDisabled,
      isLoading,
      responseAPI,
      textFieldLetters,
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
          (responseAPI && albums.length) && (
            <div>
              <h3>{`Resultado de álbuns de: ${artists}`}</h3>
              <div>
                {
                  albums.map(({
                    collectionId,
                    artistName,
                    collectionName,
                    artworkUrl100,
                  }) => (
                    <Link
                      data-testid={ `link-to-album-${collectionId}` }
                      to={ `/album/${collectionId}` }
                      key={ collectionId }
                    >
                      <div>
                        <h3>{artistName}</h3>
                        <h5>{collectionName}</h5>
                        <img src={ artworkUrl100 } alt={ collectionName } />
                      </div>
                    </Link>
                  ))
                }
              </div>
            </div>
          )
        }

        {
          (responseAPI && !albums.length) && <h1>Nenhum álbum foi encontrado</h1>
        }
      </div>
    );
  }
}

export default Search;
