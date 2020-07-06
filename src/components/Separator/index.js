import React from 'react';

import { Container } from './styles.js';

export default function Separator({ width = '90%' }) {
  return (
    <Container width={width}>
      <div>
        <hr />
      </div>
      <div>
        <img src="/img/pokeball_icon.svg" alt="Pokéball" />
      </div>
      <div>
        <hr />
      </div>
    </Container>
  );
}
