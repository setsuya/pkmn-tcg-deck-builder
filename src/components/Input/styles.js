import styled from 'styled-components';

import { colors } from '../../utils/colors';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;

  > div {
    width: 0;
    height: 0;
  }

  > div:nth-of-type(1) {
    border-bottom: 34px solid ${colors.darkBackground};
    border-left: 17px solid transparent;
  }

  > div:nth-of-type(2) {
    border-top: 34px solid ${colors.darkBackground};
    border-right: 17px solid transparent;
  }
`;

export const CustomInput = styled.input`
  box-sizing: border-box;
  border: 0;
  padding: 0 10px;
  height: 34px;
  background-color: ${colors.darkBackground};
  color: ${colors.lightText};
  font-size: 14px;
  outline: 0;
`;
