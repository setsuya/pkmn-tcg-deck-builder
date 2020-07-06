import React from 'react';

import { CustomButton } from './styles.js';

export default function Button({ text = 'button', ...rest }) {
  return (
    <CustomButton {...rest}>
      <div />
      <div>{text}</div>
      <div />
    </CustomButton>
  );
}
