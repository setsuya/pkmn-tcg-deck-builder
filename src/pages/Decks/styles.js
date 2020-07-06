import styled from 'styled-components';
import { lighten } from 'polished';

import { colors } from '../../utils/colors';

export const Container = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

export const Contents = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  min-height: 100%;
  margin: 0 auto;
  padding: 10px 20px;
  background-color: ${colors.white};
  box-shadow: 0 0 25px ${colors.shadow};
`;

export const DeckList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Deck = styled.div`
  border: 1px solid ${colors.black};
  width: 32%;
  padding: 10px;
  margin-bottom: 2%;

  > h2 {
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const EmptyDeck = styled.div`
  background-color: red;
  width: 32%;
  padding: 10px;
  margin-bottom: 2%;
`;

export const DeckInfo = styled.div`
`;

export const Formats = styled.div`
  display: flex;
`;

export const Format = styled.div`
  margin: 5px 0;
  flex-grow: 1;
  text-align: center;
  font-variant: small-caps;
  font-weight: bold;

  &.invalid {
    color: ${lighten(0.3, colors.black)};
  }
`;

export const TotalCards = styled.div`
  text-align: center;
`;

export const ActionButtons = styled.div`
  text-align: center;
`;
