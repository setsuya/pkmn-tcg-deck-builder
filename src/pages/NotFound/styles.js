import styled from 'styled-components';

import { colors } from '../../utils/colors';

export const Container = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

export const Contents = styled.div`
  display: flex;
  flex-flow: column;
  max-width: 1200px;
  min-height: 100%;
  margin: 0 auto;
  padding: 10px 20px;
  background-color: ${colors.white};
  box-shadow: 0 0 25px ${colors.shadow};

  > h1 {
    margin-bottom: 20px;
  }

  > p {
    margin-bottom: 50px;
  }
`;

export const PKMNTeam = styled.div`
  width: 60%;
  display: flex;
  margin: 10px auto;
  align-self: flex-start;
  justify-content: center;
`;

export const PKMN = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  img {
    width: 100%;
    max-width: 50%;
    height: auto;
    image-rendering: pixelated;
  }

  > p {
    margin-top: 10px;

    > a, a:hover, a:active, a:visited {
      color: ${colors.black};
      font-weight: bold;
    }

    > a:hover {
      text-decoration: none;
    }
  }
`;
