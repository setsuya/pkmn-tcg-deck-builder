import React from 'react';

import { CustomSelectButton } from './styles.js';

export default function SelectButton({ text = 'button', value = '', defaultOption = {value: '', text: 'default option'}, options = [], ...rest }) {
  const {onClick, onChange} = {...rest};

  return (
    <CustomSelectButton>
      <button onClick={onClick}>{text}</button>
      <select onChange={onChange} value={value}>
        <option value={defaultOption.value}>{defaultOption.text}</option>
        {options.map((option) => {
          return (<option key={Math.random()} value={option.value}>{option.text}</option>);
        })}
      </select>
    </CustomSelectButton>
  );
}
