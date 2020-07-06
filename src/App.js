import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Search from './pages/Search';
import Card from './pages/Card';
import Decks from './pages/Decks';
import Deck from './pages/Deck';
import SharedDeck from './pages/SharedDeck';
import NotFound from './pages/NotFound';

import GlobalStyles from './globalStyles';

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/cards/:cardID" component={Card} />
          <Route exact path="/decks" component={Decks} />
          <Route exact path="/decks/:deckID" component={Deck} />
          <Route exact path="/decks/shared/:compressedDeck" component={SharedDeck} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}
