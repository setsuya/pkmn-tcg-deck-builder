import styled from 'styled-components';

import { colors } from '../../utils/colors';

export const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  text-align: center;
  padding: 6px 0;
  display: flex;
  align-items: center;
  width: ${props => props.width};
  margin: 0 auto;

  > div:nth-child(1), > div:nth-child(3) {
    flex-grow: 1;
  }

  hr {
    border: 1px solid ${colors.black};
    margin: 0;
  }

  img {
    width: 18px;
    height: 18px;
    margin: 0 6px;
  }
`;
