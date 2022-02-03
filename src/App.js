import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <p>TrybeTunes</p>
        <Switch>
          <Route exact path="/" component={ Login } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
