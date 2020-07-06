import { createGlobalStyle } from 'styled-components';

import { colors } from './utils/colors';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  #root {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  body {
    background: #e6e6e6;
    color: ${colors.black};
    font: 16px "Roboto Condensed", sans-serif;
  }

  .text_type_icon {
    width: 14px;
    height: 14px;
    vertical-align: baseline;
  }

  .invisible {
    visibility: collapse;
  }
`;
