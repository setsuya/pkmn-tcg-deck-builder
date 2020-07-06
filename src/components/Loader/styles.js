import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  padding: 16px;

  > div {
    box-sizing: border-box;
    position: relative;
    display: inline-block;

    > span {
      box-sizing: border-box;
      position: absolute;
      left: 100%;
      bottom: 0;
    }
  }
`;
