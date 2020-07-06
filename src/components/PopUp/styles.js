import styled from 'styled-components';

import { colors } from '../../utils/colors';

export const Overlay = styled.div`
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const Container = styled.div`
  position: absolute;
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  left: 50vw;
  top: 20vh;
  transform: translateX(-50%);
  padding: 16px;
  width: 70vh;
  max-height: 60vh;
`;

export const Title = styled.div``;

export const Contents = styled.div`
  margin: 12px 0;
  overflow-y: auto;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
`;
