import React, { useState, useEffect } from 'react';

import { Container } from './styles.js';

export default function Loader({ text = 'Loading', symbol = '.', ...rest }) {
  const [ellipsis, setEllipsis] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (ellipsis.length < 3) {
        setEllipsis(`${ellipsis}${symbol}`);
      } else {
        setEllipsis('');
      }
    }, 350);

    return () => {clearTimeout(timeout);}
  }, [ellipsis, symbol]);

  return (
    <Container {...rest}>
      <div>{text}<span>{ellipsis}</span></div>
    </Container>
  );
}
