import styled from 'styled-components';

import { colors } from '../../utils/colors';

export const Overlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
  color: ${colors.black};
`;
