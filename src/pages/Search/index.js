import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getSets, getTypes, getSupertypes, getSubtypes, searchCards } from '../../api';

import Header from '../../components/Header';
import Select from '../../components/Select';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import Separator from '../../components/Separator';

import { formatEnergy } from '../../utils/stringFormatters';

import { Container, Contents, SearchBar, Filters, Buttons, SearchResults, TotalResults, Pagination } from './styles';

export default function Search() {
  const history = useHistory();
  const useMountEffect = (fn) => useEffect(fn, []);

  const [sets, setSets] = useState();
  const [types, setTypes] = useState();
  const [supertypes, setSupertypes] = useState();
  const [subtypes, setSubtypes] = useState();
  const [loadingSearch, setLoadingSearch] = useState(false);

  const [searchParams, setSearchParams] = useState({
    page: 1,
    pageSize: 50,
    name: '',
    setCode: '',
    supertype: '',
    subtype: '',
    types: '',
    nationalPokedexNumber: '',
  });

  const [searchResults, setSearchResults] = useState({
    totalPages: 0,
    totalResults: 0,
    data: [],
  });

  useEffect(() => {
    async function seedFilters() {
      const sets = await getSets();
      const types = await getTypes();
      const supertypes = await getSupertypes();
      const subtypes = await getSubtypes();

      setSets(sets.map((set) => {
        return {
          value: set.code,
          text: set.name,
        }
      }));
      setTypes(types.map((type) => {
        return {
          value: type,
          text: type,
        }
      }));
      setSupertypes(supertypes.map((supertype) => {
        return {
          value: supertype,
          text: supertype,
        }
      }));
      setSubtypes(subtypes.map((subtype) => {
        return {
          value: subtype,
          text: subtype,
        }
      }));
    }

    seedFilters();
  }, []);

  useMountEffect(searchFromURLParams);

  function searchFromURLParams() {
    if (history.location.search[0] === '?') {
      const newSearchParams = {...searchParams};
      const parameters = history.location.search.substring(1).split('&');

      parameters.forEach((parameter) => {
        const [key, value] = parameter.split('=');

        if ((key && value) && (key in searchParams)) {
          newSearchParams[key] = (key === 'page' || key === 'pageSize') ? Number(value) : decodeURIComponent(value);
        }
      });
      
      setSearchParams(newSearchParams);

      setTimeout(() => {
        document.querySelector('button[type=submit]').click();
      }, 50);
    }
  }

  async function submitSearch(ev, page) {
    ev.preventDefault();

    setLoadingSearch(true);

    const newSearchParams = {...searchParams, page: page};

    const result = await searchCards(newSearchParams);

    setSearchResults({...searchResults,
      totalPages: Math.ceil(Number(result.headers['total-count']) / searchParams.pageSize),
      totalResults: Number(result.headers['total-count']),
      data: result.data.cards,
    });
    setSearchParams(newSearchParams);

    const queryStringEntries = [];

    Object.entries(newSearchParams).forEach((entry) => {
      const [key, value] = entry;

      if (value) {
        queryStringEntries.push(`${key}=${value}`);
      }
    });

    const queryString = `?${queryStringEntries.join('&')}`;

    if (history.location.search !== queryString) {
      history.push(queryString);
    } else {
      history.replace(queryString);
    }

    setLoadingSearch(false);
  }

  function resetSearch() {
    setSearchParams({
      page: 1,
      pageSize: 50,
      name: '',
      setCode: '',
      supertype: '',
      subtype: '',
      types: '',
      nationalPokedexNumber: '',
    });
  }

  return (
    <>
      <Header />
      <Container>
        <Contents>
          <SearchBar>
            <form onSubmit={(ev) => {submitSearch(ev, searchParams.page);}}>
              <Filters>
                <div>
                  Name&nbsp;
                  <Input type="text" value={searchParams.name} onChange={(ev) => {setSearchParams({...searchParams, name: ev.target.value});}} />
                </div>
                <div>
                  Set&nbsp;
                  <Select loading={!!sets ? false : true} options={sets} value={searchParams.setCode} onChange={(ev) => {setSearchParams({...searchParams, setCode: ev.target.value});}} />
                </div>
                <div>
                  Type&nbsp;
                  <Select loading={!!supertypes ? false : true} options={supertypes} value={searchParams.supertype} onChange={(ev) => {ev.target.value === 'Pokémon' ? setSearchParams({...searchParams, supertype: ev.target.value}) : setSearchParams({...searchParams, supertype: ev.target.value, types: ''})}} />
                </div>
                <div>
                  Subtype&nbsp;
                  <Select loading={!!subtypes ? false : true} options={subtypes} value={searchParams.subtype} onChange={(ev) => {setSearchParams({...searchParams, subtype: ev.target.value});}} />
                </div>
                <div>
                  Energy&nbsp;
                  <Select loading={!!types ? false : true} options={types} value={searchParams.types} onChange={(ev) => {setSearchParams({...searchParams, types: ev.target.value});}} disabled={searchParams.supertype !== 'Pokémon'} />
                </div>
                <div>
                  Pokédex number&nbsp;
                  <Input type="number" min={1} max={893} step={1} value={searchParams.nationalPokedexNumber} onChange={(ev) => {setSearchParams({...searchParams, nationalPokedexNumber: ev.target.value});}} disabled={searchParams.supertype !== 'Pokémon'} />
                </div>
              </Filters>
              <Buttons>
                <Button type="button" text="Clear" onClick={resetSearch} />
                <Button type="submit" text="Search" />
              </Buttons>
            </form>
          </SearchBar>
          <Separator />
          <SearchResults>
            {loadingSearch ? (
              <Loader text="Loading results" />
            ) : 
              searchResults.data.length ? (
                <>
                  <TotalResults>
                    <p>Total results: {searchResults.totalResults}</p>
                  </TotalResults>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Rarity</th>
                        <th>Series</th>
                        <th>Set</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResults.data.map((card) => {
                        return (
                          <tr key={Math.random()}>
                            <td><a href={`/cards/${card.id}`} dangerouslySetInnerHTML={{ __html: formatEnergy(card.name) }} /></td>
                            <td>{card.supertype}</td>
                            <td>{card.rarity}</td>
                            <td>{card.series}</td>
                            <td>{card.set}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <Pagination>
                    <div>
                      <Button type="button" text="&lt;&lt;" onClick={(ev) => {submitSearch(ev, 1)}} disabled={searchParams.page === 1} />
                    </div>
                    <div>
                      <Button type="button" text="&lt;" onClick={(ev) => {submitSearch(ev, (searchParams.page > 1) ? searchParams.page - 1 : 1)}} disabled={searchParams.page === 1} />
                    </div>
                    <div>
                      <p>Page {searchParams.page}/{searchResults.totalPages}</p>
                    </div>
                    <div>
                      <Button type="button" text="&gt;" onClick={(ev) => {submitSearch(ev, (searchParams.page < searchResults.totalPages) ? searchParams.page + 1 : searchResults.totalPages)}} disabled={searchParams.page === searchResults.totalPages} />
                    </div>
                    <div>
                      <Button type="button" text="&gt;&gt;" onClick={(ev) => {submitSearch(ev, searchResults.totalPages)}} disabled={searchParams.page === searchResults.totalPages} />
                    </div>
                  </Pagination>
                </>
              ) : (
                <div style={{ textAlign: 'center', }}>No results to show.</div>
              )
            }
          </SearchResults>
        </Contents>
      </Container>
    </>
  );
}
