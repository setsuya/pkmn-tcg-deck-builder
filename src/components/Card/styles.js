import styled from 'styled-components';
import { lighten } from 'polished';

import { colors } from '../../utils/colors';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  background-color: ${colors.white};
`;

export const CardImage = styled.div`
  padding: 10px;
`;

export const Formats = styled.div`
  display: flex;
`;

export const Format = styled.div`
  flex-grow: 1;
  text-align: center;
  font-variant: small-caps;
  font-weight: bold;

  &.invalid {
    color: ${lighten(0.5, colors.black)};
  }
`;

export const CardInfo = styled.div`
  padding: 10px;
  flex-grow: 1;

  > div {
    border-bottom: 2px solid ${colors.black};
    padding: 5px 0;
  }

  p {
    margin: 0;
  }

  img {
    box-sizing: border-box;
    width: 20px;
    height: 20px;
    padding: 2px;
    filter: drop-shadow(1px 1px 0 ${lighten(0.33, colors.black)});
  }
`;

export const Ability = styled.div`
  border-radius: 5px;

  p:nth-child(1) {
    font-weight: bold;
  }
`;

export const Attacks = styled.div`
`;

export const Attack = styled.div`
  display: flex;
  align-items: top;
  border-radius: 5px;

  > div {
    padding: 10px;
  };

  > div:nth-child(1) {
    display: flex;
    width: 60px;

    > div {
      width: 60px;
      text-align: center;
    }
  }

  > div:nth-child(2) {
    flex-grow: 1;

    p:nth-child(1) {
      font-weight: bold;
    }
  }

  > div:nth-child(3) {
    font-weight: bold;
    font-size: 24px;
  }
`;

export const CardText = styled.div``;

export const Details = styled.div`
  display: flex;

  > div {
    flex-grow: 1;

    img {
      vertical-align: bottom;
    }

    > p {
      text-align: center;
    }

    > p:nth-child(1) {
      font-weight: bold;
    }
  }
`;

export const SetInfo = styled.div`
  display: flex;

  > div {
    flex-grow: 1;

    > p {
      text-align: center;
    }

    > p:nth-child(1) {
      font-weight: bold;
    }
  }
`;
