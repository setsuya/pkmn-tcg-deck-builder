import React from 'react';

import { Container, InnerContainer, Title, Contents } from './styles.js';

export default function CardData({ title = 'title', size = '4', contents }) {
  return (
    <Container size={size}>
      <InnerContainer>
        <Title>{title}</Title>
        <Contents>
          {contents}
        </Contents>
      </InnerContainer>
    </Container>
  );
}
