import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { showFavorites } from '../../utils/favoritesStorage';

import { getSets, searchLegalSets } from '../../api';

import Header from '../../components/Header';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import ContentCard from '../../components/ContentCard';

import { Container, Contents } from './styles';

export default function Home() {
  const history = useHistory();

  const [favoriteCards, setFavoriteCards] = useState();
  const [loading, setLoading] = useState(true);
  const [randomSet, setRandomSet] = useState();
  const [standardLegalSets, setStandardLegalSets] = useState();
  const [expandedLegalSets, setExpandedLegalSets] = useState();
  const [releases, setReleases] = useState();

  useEffect(() => {
    async function getRandomSetInfo() {
      const setsInfo = await getSets();

      const randomIndex = Math.floor(Math.random() * setsInfo.length);

      setRandomSet(setsInfo[randomIndex]);
    }

    async function getStandardSets() {
      const setsInfo = await searchLegalSets('standard');

      let sets = {};

      setsInfo.forEach((cardSet) => {
        sets = {...sets,
          [cardSet.series]: sets[cardSet.series] ? 
            [...sets[cardSet.series], {
              name: cardSet.name,
              code: cardSet.code,
            }] : [{
              name: cardSet.name,
              code: cardSet.code,
            }],
        };
      });

      setStandardLegalSets(sets);
    }

    async function getExpandedSets() {
      const setsInfo = await searchLegalSets('expanded');

      let sets = {};

      setsInfo.forEach((cardSet) => {
        sets = {...sets,
          [cardSet.series]: sets[cardSet.series] ? 
            [...sets[cardSet.series], {
              name: cardSet.name,
              code: cardSet.code,
            }] : [{
              name: cardSet.name,
              code: cardSet.code,
            }],
        };
      });

      setExpandedLegalSets(sets);
    }

    async function getReleases() {
      const releasesInfo = await axios.get('https://api.github.com/repos/setsuya/pkmn-tcg-deck-builder/releases');

      setReleases(releasesInfo.data);
    }

    getRandomSetInfo();
    getStandardSets();
    getExpandedSets();
    getReleases();

    setFavoriteCards(showFavorites());
    setLoading(false);
  }, []);

  function filterFavorites(searchTerm) {
    const searchRegex = new RegExp(searchTerm, 'i');

    Object.keys(favoriteCards).forEach((key) => {
      const item = favoriteCards[key];

      if (item.name.search(searchRegex) === -1) {
        document.querySelector(`[data-id=${key}]`).classList.add('invisible');
      } else {
        document.querySelector(`[data-id=${key}]`).classList.remove('invisible');
      }
    })
  }

  window.onstorage = (ev) => {
    if (ev.key === 'PKMNFavorites') {
      setFavoriteCards(showFavorites());
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Contents>
          {!loading ? (
            <>
              <ContentCard
                title="Favorite Cards"
                size="2"
                contents={
                  <div className="favorites">
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Type</th>
                          <th>Rarity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(favoriteCards).map((card) => {
                          const favoriteItem = favoriteCards[card];

                          return (
                            <tr key={Math.random()} data-id={card}>
                              <td><a href={`/cards/${favoriteItem.id}`}>{favoriteItem.name}</a></td>
                              <td>{favoriteItem.supertype}</td>
                              <td>{favoriteItem?.rarity}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <div>
                      <div>
                        Filter: <input type="text" onChange={(ev) => {filterFavorites(ev.target.value);}} />
                      </div>
                    </div>
                  </div>
                }
              />
              <ContentCard
                title="Standard Legal Sets"
                size="1"
                contents={
                  <div className="sets_list">
                    {Object.keys(standardLegalSets || {}).reverse().map((series) => {
                      const seriesSets = standardLegalSets[series];

                      let groupedSets = [<p key={Math.random()} className="series_name">{series}</p>];

                      Object.keys(seriesSets).forEach((set) => {
                        const item = seriesSets[set];

                        groupedSets.push(
                          <p key={Math.random()}>
                            <a href={`/search?page=1&pageSize=50&setCode=${item.code}`}>{item.name}</a>
                          </p>
                        );
                      });

                      return groupedSets;
                    })}
                  </div>
                }
              />
              <ContentCard
                title="Expanded Legal Sets"
                size="1"
                contents={
                  <div className="sets_list">
                    {Object.keys(expandedLegalSets || {}).reverse().map((series) => {
                      const seriesSets = expandedLegalSets[series];

                      let groupedSets = [<p key={Math.random()} className="series_name">{series}</p>];

                      Object.keys(seriesSets).forEach((set) => {
                        const item = seriesSets[set];

                        groupedSets.push(
                          <p key={Math.random()}>
                            <a href={`/search?page=1&pageSize=50&setCode=${item.code}`}>{item.name}</a>
                          </p>
                        );
                      });

                      return groupedSets;
                    })}
                  </div>
                }
              />
              <ContentCard
                title="Latest Releases"
                size="3"
                contents={
                  releases?.map((release) => {
                    const releaseBodyLines = release.body.split('\n');

                    return (
                      <div key={Math.random()} className="release">
                        <h3>{release.name} <span className="release_date">({new Date(release.published_at).toLocaleString('en-US')})</span></h3>
                        {releaseBodyLines.map((line, index) => {
                          if (!(index === (releaseBodyLines.length - 1) && !line)) {
                            return (<p key={Math.random()}>{line || <>&nbsp;</>}</p>);
                          } else {
                            return false;
                          }
                        })}
                      </div>
                    );
                  })
                }
              />
              <ContentCard
                title="Random Set"
                size="1"
                contents={
                  <div className="random_set">
                    <div>
                      <img src={randomSet?.logoUrl} className="set_logo" alt={randomSet?.name} />
                    </div>
                    <div className="set_info">
                      <div className="set_legality">
                        <p>{randomSet?.standardLegal ? '✓' : '×'} Standard</p>
                        <p>{randomSet?.expandedLegal ? '✓' : '×'} Expanded</p>
                      </div>
                      <p>Release date: {randomSet?.releaseDate}</p>
                      <p>Total cards: {randomSet?.totalCards}</p>
                      <p>Symbol: {randomSet?.symbolUrl && (<img src={randomSet?.symbolUrl} className="set_symbol" alt="Set symbol" />)}</p>
                    </div>
                    <div className="view_set_button">
                      <Button text="View cards" onClick={() => {history.push(`/search?setCode=${randomSet?.code}`)}} />
                    </div>
                  </div>
                }
              />
            </>
          ) : (
            <Loader />
          )}
        </Contents>
      </Container>
    </>
  );
}
