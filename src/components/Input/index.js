import React from 'react';

import { Container, CustomInput } from './styles.js';

export default function Input({ ...rest }) {
  return (
    <Container>
      <div />
      <CustomInput {...rest} />
      <div />
    </Container>
  );
}
