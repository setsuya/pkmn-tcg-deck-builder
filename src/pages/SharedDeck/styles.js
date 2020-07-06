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

export const Buttons = styled.div`
  text-align: center;
`;

export const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Card = styled.div`
  position: relative;
  width: 20%;
  height: 220px;
  padding: 10px;
  text-align: center;

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
  position: absolute;
  bottom: 0;
  right: 5px;
  font-size: 32px;
  font-weight: bold;
  text-shadow:
    1px 1px 0 ${colors.white},
    -1px 1px 0 ${colors.white},
    -1px -1px 0 ${colors.white},
    1px -1px 0 ${colors.white},
    2px 2px 0 ${colors.shadow};
`;
