import styled from 'styled-components';
import { darken, lighten } from 'polished';

import { colors } from '../../utils/colors';

export const CustomCardSpinner = styled.div`
  display: flex;
  align-items: flex-end;
  margin: 0;

  > input {
    width: 100%;
    height: 30px;
    border: 1px solid ${colors.darkBackground};
    border-left: 1px solid ${lighten(0.07, colors.darkBackground)};
    border-right: 1px solid ${darken(0.07, colors.darkBackground)};
    background-color: ${colors.darkBackground};
    color: ${colors.lightText};
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    flex-grow: 5;
    flex-basis: 0;
    box-shadow: 0 4px 0 ${darken(0.3, colors.darkBackground)};

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type=number] {
      -moz-appearance: textfield;
    }
  }
`;

export const CustomButton = styled.button`
  vertical-align: bottom;
  padding: 5px 15px;
  height: 30px;
  background-color: ${colors.darkBackground};
  border: 0;
  box-shadow: 0 4px 0 ${darken(0.1, colors.darkBackground)};
  color: ${colors.lightText};
  font-size: 14px;
  outline: 0;
  flex-grow: 1;
  flex-basis: 0;

  &:active:enabled {
    box-shadow: 0 2px 0 ${darken(0.1, colors.darkBackground)};
    transform: translateY(2px);
  }

  &:disabled {
    background-color: ${lighten(0.1, colors.darkBackground)};
    color: ${darken(0.15, colors.lightText)};
  }

  &:nth-of-type(1) {
    border-right: 1px solid ${lighten(0.07, colors.darkBackground)};
  }

  &:nth-of-type(2) {
    border-left: 1px solid ${darken(0.07, colors.darkBackground)};
  }
`;
