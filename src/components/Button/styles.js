import styled from 'styled-components';
import { lighten, darken } from 'polished';

import { colors } from '../../utils/colors';

export const CustomButton = styled.button`
  box-sizing: border-box;
  vertical-align: bottom;
  padding: 5px 25px;
  margin: 5px;
  height: 30px;
  background-color: ${colors.darkBackground};
  border: 0;
  color: ${colors.lightText};
  font-size: 14px;
  outline: 0;
  box-shadow: 0 4px 0 ${darken(0.1, colors.darkBackground)};

  &:active:enabled {
    box-shadow: 0 2px 0 ${darken(0.1, colors.darkBackground)};
    transform: translateY(2px);
  }

  &:disabled {
    background-color: ${lighten(0.1, colors.darkBackground)};
    color: ${darken(0.15, colors.lightText)};
  }
`;
