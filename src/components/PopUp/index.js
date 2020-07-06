import React from 'react';

import { Overlay, Container, Title, Contents, Buttons } from './styles.js';
import Button from '../Button';

export default function PopUp({ title = 'Warning!', contents = (<p>Contents</p>), buttons = [['OK', () => {return;}]], ...rest }) {
  return (
    <Overlay>
      <Container>
        <Title>
          <h2>{title}</h2>
        </Title>
        <Contents>
          {contents}
        </Contents>
        <Buttons>
          {buttons.map((button) => {
              return (<Button key={Math.random()} text={button[0]} onClick={button[1]} />);
            })
          }
        </Buttons>
      </Container>
    </Overlay>
  );
}
