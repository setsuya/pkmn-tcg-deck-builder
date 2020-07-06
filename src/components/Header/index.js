import React from 'react';

import { Container, Layout } from './styles.js';

export default function Header() {
  return (
    <Container>
      <div>PokéDECKS</div>
      <div>
        <a href="/">Home</a> | <a href="/search">Search</a> | <a href="/decks">Decks</a>
      </div>
      <div />
      <Layout>
        <div>
          <div />
        </div>
        <div>
          <div />
        </div>
      </Layout>
    </Container>
  );
}
