import styled from 'styled-components';

export const Container = styled.div`
  margin: 10px 0 20px 0;

  > h3 {
    font-size: 18px;
    margin-bottom: 6px;

    > span {
      font-size: 28px;
      font-weight: bold;
    }
  }
`;

export const Types = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  text-align: center;
`;

export const Type = styled.div`
  flex-grow: 1;
  flex-basis: 0;
`;

export const Title = styled.div``;

export const Content = styled.div`
  font-weight: bold;
`;
