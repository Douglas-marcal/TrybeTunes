import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header, Loading, NavBar } from '../components';
import searchAlbums from '../services/searchAlbumsAPI';
import '../styles/Search.css';

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
      <div data-testid="page-search" className="page-search">
        <Header />
        <NavBar />
        {/* <ul className="menu-container-mobile">
          <NavLink to="/search" activeClassName="selected" className="link">
            <li data-testid="link-to-search">Pesquisa</li>
          </NavLink>
          <NavLink to="/favorites" activeClassName="selected" className="link">
            <li data-testid="link-to-favorites">Favoritos</li>
          </NavLink>
          <NavLink to="/profile" activeClassName="selected" className="link">
            <li data-testid="link-to-profile">Perfil</li>
          </NavLink>
        </ul> */}

        {
          isLoading
            ? <Loading />
            : (
              <form className="search-container" onSubmit={ this.requestAPI }>
                <input
                  data-testid="search-artist-input"
                  type="text"
                  className="input-artist"
                  placeholder="Nome do artista ou banda"
                  value={ textFieldLetters }
                  onChange={ this.validateInput }
                />
                <button
                  data-testid="search-artist-button"
                  type="submit"
                  className="button-search"
                  disabled={ buttonDisabled }
                >
                  Pesquisar
                </button>
              </form>
            )
        }

        {
          (responseAPI && albums.length) && (
            <div className="results-container">
              <h3 className="result-title">{`Resultado de álbuns de: ${artists}`}</h3>
              <div className="albums-container">
                {
                  albums.map(({
                    collectionId,
                    artistName,
                    collectionName,
                    artworkUrl100,
                  }) => (
                    <Link
                      data-testid={ `link-to-album-${collectionId}` }
                      className="album"
                      to={ `/album/${collectionId}` }
                      key={ collectionId }
                    >
                      <div className="album-container">
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
