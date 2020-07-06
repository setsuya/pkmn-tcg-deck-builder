import React from 'react';

import { Container, CustomSelect } from './styles.js';

export default function Select({ loading = false, defaultOption = {value: '', text: 'All'}, options = [], ...rest }) {
  return (
    <Container>
      <div />
      <CustomSelect {...rest}>
        {!loading ? (
          <>
            <option value={defaultOption.value}>{defaultOption.text}</option>
            {options.map((option) => {
              return (
                <option key={Math.random()} value={option.value}>{option.text}</option>
              );
            })}
          </>
        ) : (
          <option value="">Loading...</option>
        )}
      </CustomSelect>
      <div />
    </Container>
  );
}
