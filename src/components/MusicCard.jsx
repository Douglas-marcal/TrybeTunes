import React, { Component } from 'react';

class MusicCard extends Component {
  render() {
    const { playlist } = this.props;
    return (
      <div>
        {
          playlist
            .filter(({ trackName }) => trackName)
            .map(({ trackName, previewUrl, trackNumber }) => (
              <div key={ trackNumber }>
                <p>{trackName}</p>
                <audio data-testid="audio-component" src={ previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                  .
                </audio>
              </div>
            ))
        }
      </div>
    );
  }
}

export default MusicCard;
