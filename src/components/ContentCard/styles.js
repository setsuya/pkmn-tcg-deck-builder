import styled from 'styled-components';
import { lighten } from 'polished';

import { colors } from '../../utils/colors';

const getContainerWidth = (size) => {
  switch(size) {
    case '4':
      return '100%';
    case '3':
      return '75%';
    case '2':
      return '50%';
    case '1':
      return '25%';
    default:
      return;
  }
};

export const Container = styled.div`
  padding: 10px;
  width: ${(props) => getContainerWidth(props.size)};
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${colors.black};
  border-radius: 2px;
  background-color: ${colors.white};
  box-shadow: 0 0 5px ${lighten(0.33, colors.black)};
  padding: 10px;
`;

export const Title = styled.h2`
  margin-bottom: 12px;
  font-variant: small-caps;
  color: ${colors.darkBackground};
`;

export const Contents = styled.div`
  flex-grow: 1;
  height: 220px;
  overflow: hidden;
  overflow-y: auto;

  .favorites {
    display: flex;
    flex-direction: column;
    position: relative;
    min-height: 100%;

    > table {
      border: 1px solid ${colors.darkBackground};
      width: 100%;
      border-spacing: 0;

      th {
        background-color: ${colors.darkBackground};
        position: sticky;
        top: 0;
        color: ${colors.lightText};
        padding: 5px;
        font-weight: bold;
        font-variant: small-caps;
        text-align: left;
      }

      td {
        padding: 5px;

        > a {
          font-weight: bold;
          color: ${colors.darkText};
        }
      }

      > tbody tr:nth-child(even) {
        background-color: ${lighten(0.5, colors.darkBackground)};
      }
    }

    > div {
      display: flex;
      flex-grow: 1;
      flex-stretch: 1;
      align-items: flex-end;
      position: sticky;
      bottom: 0;
      background-color: ${colors.white};

      > div {
        border-top: 1px solid ${colors.black};
        flex-grow: 1;
        text-align: right;

        > input {
          border: 0;
          border-bottom: 1px solid ${colors.black};
          margin-left: 5px;
          padding: 0 5px;
        }
      }
    }
  }


  > .sets_list {
    .series_name {
      margin: 0;
      font-weight: bold;
    }

    p {
      margin-left: 10px;

      > a {
        color: ${colors.darkText};

        &:hover {
          text-decoration: none;
        }
      }
    }
  }

  > .random_set {
    display: flex;
    flex-direction: column;

    .set_logo {
      display: block;
      margin: 0 auto;
      max-width: 100%;
      max-height: 74px;
    }

    .set_info {
      text-align: left;
      flex-grow: 1;

      > .set_legality {
        display: flex;
        margin: 10px 0;

        > p {
          flex-grow: 1;
          text-align: center;
          font-weight: bold;
          font-variant: small-caps;
        }
      }

      .set_symbol {
        max-width: 100%;
        height: 16px;
      }
    }

    .view_set_button {
      align-items: flex-end;
      text-align: center;
    }
  }

  .release {
    border-bottom: 2px solid ${colors.black};
    margin-bottom: 20px;
    padding-bottom: 20px;

    > h3 {
      font-size: 20px;
      margin-bottom: 10px;

      > .release_date {
        font-weight: normal;
        font-size: 12px;
        font-style: italic;
      }
    }
  }
`;
