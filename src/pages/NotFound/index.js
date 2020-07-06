import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';
import Separator from '../../components/Separator';

import { Container, Contents, PKMNTeam, PKMN } from './styles';

export default function NotFound() {
  const [pokemonTeam, setPokemonTeam] = useState();

  useEffect(() => {
    let dexNumberArray = [];

    for (let i = 0; i < 6; i++) {
      const pokedexNumber = Math.floor(Math.random() * (893 - 1)) + 1;

      dexNumberArray.push(String(pokedexNumber).padStart(3, '0'));
    }

    setPokemonTeam(dexNumberArray);
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Contents>
          <h1>Sorry, but we can't find the page you were looking for...</h1>
          <p>But since you are here... Have you tried this combination of pokémon when playing one of the games? By the way, you can click on the number of any of the pokémon shown here to see the cards that they appear in!</p>
          <Separator width="70%" />
          <PKMNTeam>
            {pokemonTeam?.map((pokemon) => {
              return(
                <PKMN key={Math.random()}>
                  <img src={`/img/pkmn_icons/${pokemon}.png`} alt={`Pokémon #${pokemon}`} />
                  <p><a href={`/search?supertype=Pokémon&nationalPokedexNumber=${pokemon}`}>#{pokemon}</a></p>
                </PKMN>
              );
            })}
          </PKMNTeam>
        </Contents>
      </Container>
    </>
  );
}
