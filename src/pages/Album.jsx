import React, { Component } from 'react';
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

export default Album;
