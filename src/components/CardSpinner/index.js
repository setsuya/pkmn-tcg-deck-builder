import React from 'react';

import { CustomCardSpinner, CustomButton } from './styles.js';

export default function CardSpinner({ value = 1, max = 4, increaseFunction = () => {return;}, decreaseFunction = () => {return;} }) {
  return (
    <CustomCardSpinner>
      <CustomButton onClick={decreaseFunction} disabled={value === 1}>-</CustomButton>
      <input type="number" value={value} min="1" max={max} step="1" disabled />
      <CustomButton onClick={increaseFunction} disabled={value === max}>+</CustomButton>
    </CustomCardSpinner>
  );
}
