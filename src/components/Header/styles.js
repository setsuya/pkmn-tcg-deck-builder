import styled from 'styled-components';
import { lighten } from 'polished';

import { colors } from '../../utils/colors';

export const Container = styled.div`
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  padding: 6px 10px;
  background-color: ${colors.darkBackground};
  color: ${colors.lightText};
  font-variant: small-caps;
  text-align: center;

  > div:nth-of-type(1) {
    flex-grow: 1;
    flex-basis: 0;
    text-align: left;
    font-size: 24px;
    font-weight: bold;
    text-shadow: 1px 1px 0 #333;
  }

  > div:nth-of-type(2) {
    flex-grow: 3;
    flex-basis: 0;
  }

  > div:nth-of-type(3) {
    flex-grow: 1;
    flex-basis: 0;
  }

  a, a:hover, a:active, a:visited {
    color: ${colors.lightLink};
  }

  a:hover {
    color: ${lighten(0.15, colors.lightLink)};
    text-decoration: none;
  }
`;

export const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;

  > div {
    position: relative;
    width: 20px;
    height: 10px;
    background-color: ${colors.darkBackground};
  }

  > div:nth-of-type(1) > div {
    position: absolute;
    left: 100%;
    width: 0;
    height: 0;
    border-top: 10px solid ${colors.darkBackground};
    border-right: 40px solid transparent;
  }

  > div:nth-of-type(2) > div {
    position: absolute;
    right: 100%;
    width: 0;
    height: 0;
    border-top: 10px solid ${colors.darkBackground};
    border-left: 40px solid transparent;
  }
`;
