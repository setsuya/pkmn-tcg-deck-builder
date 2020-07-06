import styled from 'styled-components';

import { colors } from '../../utils/colors';

export const Container = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

export const Contents = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  min-height: 100%;
  margin: 0 auto;
  padding: 10px 20px;
  background-color: ${colors.white};
  box-shadow: 0 0 25px ${colors.shadow};
`;

export const DeckOptions = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  text-align: center;
`;
