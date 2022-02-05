import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header } from '../components';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();

    this.requestMusic = this.requestMusic.bind(this);
  }

  componentDidMount() {
    this.requestMusic();
  }

  requestMusic() {
    const { match: { params: { id } } } = this.props;
    getMusics(id).then((data) => data);
  }

  render() {
    return (
      <div data-testid="page-album">
        <Header />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
