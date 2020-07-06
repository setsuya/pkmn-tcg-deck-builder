import styled from 'styled-components';
import { lighten, darken } from 'polished';

import { colors } from '../../utils/colors';

export const CustomSelectButton = styled.div`
  margin: 5px;

  > button {
    box-sizing: border-box;
    vertical-align: bottom;
    padding: 5px 10px 5px 25px;
    height: 30px;
    background-color: ${colors.darkBackground};
    border: 0;
    border-right: 1px solid ${darken(0.3, colors.darkBackground)};
    box-shadow: 0 4px 0 ${darken(0.1, colors.darkBackground)};
    color: ${colors.lightText};
    font-size: 14px;
    outline: 0;

    &:active:enabled {
      box-shadow: 0 2px 0 ${darken(0.1, colors.darkBackground)};
      transform: translateY(2px);
    }

    &:disabled {
      color: ${darken(0.5, colors.lightText)};
    }
  }

  > select {
    box-sizing: border-box;
    vertical-align: bottom;
    padding: 5px 25px 5px 5px;
    height: 30px;
    background-color: ${colors.darkBackground};
    border: 0;
    border-left: 1px solid ${lighten(0.3, colors.darkBackground)};
    box-shadow: 0 4px 0 ${darken(0.1, colors.darkBackground)};
    color: ${colors.lightText};
    font-size: 14px;
    outline: 0;

    &:active:enabled {
      box-shadow: 0 2px 0 ${darken(0.1, colors.darkBackground)};
      transform: translateY(2px);
    }

    &:disabled {
      color: ${darken(0.5, colors.lightText)};
    }
  }
`;
