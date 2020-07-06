import React, { useState, useEffect } from 'react';

import { uncompressDeck, saveSharedDeck } from '../../utils/deckStorage';

import Header from '../../components/Header';
import Loader from '../../components/Loader';
import CardImage from '../../components/CardImage';
import Separator from '../../components/Separator';
import Button from '../../components/Button';

import { Container, Contents, Buttons, Cards, Card, CardQuantity } from './styles';

export default function SharedDeck({ match }) {
  const { compressedDeck } = match.params;

  const [deck, setDeck] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function prepareDeck() {
      const uncompressedDeck = await uncompressDeck(compressedDeck);

      setDeck(uncompressedDeck);
      setLoading(false);
    }

    prepareDeck();
  }, [compressedDeck]);

  return (
    <>
      <Header />
      <Container>
        <Contents>
          {!loading ? (
            <>
              <h2>{deck.name}</h2>
              <Buttons>
                <Button text="Save deck" onClick={() => {saveSharedDeck(deck)}} />
              </Buttons>
              <Separator />
              <Cards>
                {Object.keys(deck.cards.pokemon).map((key) => {
                  const card = deck.cards.pokemon[key];

                  return (
                    <Card key={Math.random()}>
                      <a href={`/cards/${card.id}`}>
                        <CardImage src={card.imageUrl} alt={card.name} />
                      </a>
                      <CardQuantity>&times;{card.quantity}</CardQuantity>
                    </Card>
                  );
                })}

                {Object.keys(deck.cards.trainer).map((key) => {
                  const card = deck.cards.trainer[key];

                  return (
                    <Card key={Math.random()}>
                      <a href={`/cards/${card.id}`}>
                        <CardImage src={card.imageUrl} alt={card.name} />
                      </a>
                      <CardQuantity>&times;{card.quantity}</CardQuantity>
                    </Card>
                  );
                })}

                {Object.keys(deck.cards.ace).map((key) => {
                  const card = deck.cards.ace[key];

                  return (
                    <Card key={Math.random()}>
                      <a href={`/cards/${card.id}`}>
                        <CardImage src={card.imageUrl} alt={card.name} />
                      </a>
                      <CardQuantity>&times;{card.quantity}</CardQuantity>
                    </Card>
                  );
                })}

                {Object.keys(deck.cards.energy).map((key) => {
                  const card = deck.cards.energy[key];

                  return (
                    <Card key={Math.random()}>
                      <a href={`/cards/${card.id}`}>
                        <CardImage src={card.imageUrl} alt={card.name} />
                      </a>
                      <CardQuantity>&times;{card.quantity}</CardQuantity>
                    </Card>
                  );
                })}
              </Cards>
            </>
          ) : (
            <Loader text="Preparing deck" />
          )}
        </Contents>
      </Container>
    </>
  );
}
