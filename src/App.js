import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Album, Favorites, Login, Search } from './pages';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <p>TrybeTunes</p>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
