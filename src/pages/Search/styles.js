import styled from 'styled-components';

import { lighten, darken } from 'polished';

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
  box-shadow: 0 0 25px ${darken(0.2, colors.white)};
`;

export const SearchBar = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

export const Filters = styled.div`
  display: flex;

  > div {
    flex-basis: 0;
    flex-grow: 1;
    padding: 5px 10px;

    select, input {
      width: 100%;
    }
  }
`;

export const Buttons = styled.div`
  text-align: right;
`;

export const SearchResults = styled.div`
  padding: 10px;

  > table {
    border: 1px solid ${colors.darkBackground};
    width: 100%;
    border-spacing: 0;

    thead {
      th {
        background-color: ${colors.darkBackground};
        position: sticky;
        top: 0;
        color: ${colors.lightText};
        padding: 5px 10px;
        font-weight: bold;
        font-variant: small-caps;
        text-align: left;
      }
    }

    tbody {
      tr:nth-child(even) {
        background-color: ${lighten(0.5, colors.darkBackground)};
      }

      td {
        padding: 2px 10px;
      }

      a, a:hover, a:active, a:visited {
        color: ${colors.darkText};
        font-weight: bold;
      }

      a:hover {
        text-decoration: none;
      }
    }
  }
`;

export const TotalResults = styled.div`
  text-align: center;

  p {
    margin: 10px 0;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;

  > div {
    p {
      margin: 0 10px;
      font-size: 18px;
    }
  }
`;
