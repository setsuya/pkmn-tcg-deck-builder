import React from 'react';

import { Container, CardImage, Formats, Format, CardInfo, Ability, Attacks, Attack, CardText, Details, SetInfo } from './styles.js';

import { formatEnergy, formatItalicsAndEnergy } from '../../utils/stringFormatters';

export default function CardData({ card = {}, set = {} }) {
  return (
    <Container>
      <CardImage>
        <img src={card?.imageUrl} alt={card?.name} />
        <Formats>
          <Format className={!card?.formats?.standardLegal && 'invalid'}>{card?.formats?.standardLegal ? '✓' : '×'} Standard</Format>
          <Format className={!card?.formats?.expandedLegal && 'invalid'}>{card?.formats?.expandedLegal ? '✓' : '×'} Expanded</Format>
        </Formats>
      </CardImage>
      <CardInfo>
        <div>
          <p>{card?.subtype} {card?.supertype}</p>
        </div>
        <div>
          {card?.supertype === 'Pokémon' ? (
            <p>{card?.name}: {card?.hp}HP {card?.types?.map((type) => {return (<img key={Math.random()} className="text_type_icon" src={`/img/type_icons/${type.toLowerCase()}.png`} alt={type} />);})}</p>
          ) : (
            <p dangerouslySetInnerHTML={{ __html: formatEnergy(card?.name || '') }} />
          )}
        </div>
        {card?.supertype === 'Pokémon' ? (
          <Attacks>
            <Ability>
              <p>{card?.ability?.name}</p>
              <p dangerouslySetInnerHTML={{ __html: formatItalicsAndEnergy(card?.ability?.text || '') }} />
            </Ability>
            {card?.attacks?.map((attack) => {
              return (
                <Attack key={Math.random()}>
                  <div>
                    <div>{attack.cost.map((energy) => {return(<img key={Math.random()} src={`/img/type_icons/${energy.toLowerCase()}.png`} alt={energy} />);})}</div>
                  </div>
                  <div>
                    <p>{attack.name}</p>
                    <p dangerouslySetInnerHTML={{ __html: formatItalicsAndEnergy(attack.text || '') }} />
                  </div>
                  <div>
                    <p>{attack.damage}</p>
                  </div>
                </Attack>
              )
            })}
          </Attacks>
        ) : card?.text && (
          <CardText>
            {card?.text.map((line) => {
              return (<p key={Math.random()} dangerouslySetInnerHTML={{ __html: formatItalicsAndEnergy(line || '') }} />)
            })}
          </CardText>
        )}
        {card?.supertype === 'Pokémon' && (
          <Details>
            <div>
              <p>Weakness</p>
              {card?.weaknesses?.map((weakness) => {
                return (
                  <p key={Math.random()}><img src={`/img/type_icons/${weakness.type.toLowerCase()}.png`} alt={weakness.type} /> {weakness.value}</p>
                );
              })}
            </div>
            <div>
              <p>Resistance</p>
              {card?.resistances?.map((resistance) => {
                return (
                  <p key={Math.random()}><img src={`/img/type_icons/${resistance.type.toLowerCase()}.png`} alt={resistance.type} /> {resistance.value}</p>
                );
              })}
            </div>
            <div>
              <p>Retreat cost</p>
              <p>{card?.retreatCost?.map((energy) => {return(<img key={Math.random()} src={`/img/type_icons/${energy.toLowerCase()}.png`} alt={energy.type} />);})}</p>
            </div>
          </Details>
        )}
        <SetInfo>
          <div>
            <p>Series</p>
            <p>{card?.series}</p>
          </div>
          <div>
            <p>Set</p>
            <p><img src={set?.symbolUrl} alt={card?.set} style={{ width: 'auto', height: '16px', verticalAlign: 'baseline', }} /> {card?.set}</p>
          </div>
          <div>
            <p>Rarity</p>
            <p>{card?.rarity}</p>
          </div>
        </SetInfo>
      </CardInfo>
    </Container>
  );
}
