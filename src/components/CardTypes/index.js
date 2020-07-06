import React from 'react';

import { Container, Types, Type, Title, Content } from './styles.js';

export default function CardTypes({ total = 0, pokemon = 0, trainer = 0, ace = 0, energy = 0 }) {
  return (
    <Container>
      <h3>Total cards: <span>{total}</span></h3>
      <Types>
        <Type>
          <Content>{pokemon}</Content>
          <Title>Pokémon</Title>
        </Type>
        <Type>
          <Content>{trainer}</Content>
          <Title>Trainer</Title>
        </Type>
        <Type>
          <Content>{ace}</Content>
          <Title>ACE</Title>
        </Type>
        <Type>
          <Content>{energy}</Content>
          <Title>Energy</Title>
        </Type>
      </Types>
    </Container>
  );
}
