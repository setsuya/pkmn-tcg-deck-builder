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

export const DeckName = styled.div`
  display: flex;
  align-items: flex-end;

  > input {
    border: 0;
    border-bottom: 1px solid ${colors.black};
    flex-grow: 1;
    font: bold 24px "Roboto Condensed", sans-serif;
    color: ${colors.black};
    background-color: transparent;
    height: 32px;
    margin: 5px 0;
    padding: 0 5px;

    &:disabled {
      border: 0;
    }
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Card = styled.div`
  width: 25%;
  padding: 10px;
  text-align: center;
`;

export const SmallImage = styled.div`
  align-items: center;
  height: 260px;
  margin-bottom: 10px;

  > a {
    > img {
      max-width: 100%;
      max-height: 100%;

      &:hover {
        filter: drop-shadow(0 0 6px ${colors.darkShadow});
      }
    }
  }
`;

export const CardQuantity = styled.div`
  font-size: 32px;
  font-weight: bold;
  text-shadow:
    1px 1px 0 ${colors.white},
    -1px 1px 0 ${colors.white},
    -1px -1px 0 ${colors.white},
    1px -1px 0 ${colors.white},
    2px 2px 0 ${colors.shadow};
`;
