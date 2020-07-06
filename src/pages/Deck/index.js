import React, { useState, useEffect } from 'react';

import { showDeck, updateDeck } from '../../utils/deckStorage';

import Header from '../../components/Header';
import Loader from '../../components/Loader';
import CardSpinner from '../../components/CardSpinner';
import Button from '../../components/Button';
import Separator from '../../components/Separator';

import { Container, Contents, DeckName, ActionButtons, Cards, Card, SmallImage, CardQuantity } from './styles';

export default function Deck({ match }) {
  const { deckID } = match.params;

  const [deck, setDeck] = useState();
  const [loading, setLoading] = useState(true);
  const [nameEditDisabled, setNameEditDisabled] = useState(true);

  useEffect(() => {
    const newDeck = showDeck(deckID);

    setDeck(newDeck);

    setLoading(false);
  }, [deckID]);

  function increaseCardCount(cardType, cardID) {
    setDeck({...deck,
      totals: {...deck.totals,
        total_cards: deck.totals.total_cards + 1,
        [`${cardType}_cards`]: deck.totals[`${cardType}_cards`] + 1,
      },
      cards: {...deck.cards,
        [cardType]: {...deck.cards[cardType],
          [cardID]: {...deck.cards[cardType][cardID],
            quantity: deck.cards[cardType][cardID].quantity + 1
          },
        },
      },
    });
  }

  function decreaseCardCount(cardType, cardID) {
    setDeck({...deck,
      totals: {...deck.totals,
        total_cards: deck.totals.total_cards - 1,
        [`${cardType}_cards`]: deck.totals[`${cardType}_cards`] - 1,
      },
      cards: {...deck.cards,
        [cardType]: {...deck.cards[cardType],
          [cardID]: {...deck.cards[cardType][cardID],
            quantity: deck.cards[cardType][cardID].quantity - 1
          },
        },
      },
    });
  }

  function removeCard(cardType, cardID) {
    const newDeck = {...deck,
      totals: {...deck.totals,
        total_cards: deck.totals.total_cards - deck.cards[cardType][cardID].quantity,
        [`${cardType}_cards`]: deck.totals[`${cardType}_cards`] - deck.cards[cardType][cardID].quantity,
      },
      cards: {...deck.cards,
        [cardType]: {...deck.cards[cardType],
          [cardID]: {...deck.cards[cardType][cardID],
            remove: true
          },
        },
      },
    };

    setDeck(newDeck);
  }

  function prepareAndUpdateDeck() {
    Object.keys(deck.cards).forEach((type) => {
      const cardType = deck.cards[type];

      Object.keys(cardType).forEach((card) => {
        const cardItem = cardType[card];

        if (cardItem.remove) {
          delete deck.cards[type][card];
        }
      });
    });

    const updatedDeck = updateDeck(deckID, deck);

    setDeck(updatedDeck);
  }

  function resetDeck() {
    const oldDeck = showDeck(deckID);

    setDeck(oldDeck);
  }

  function getMaxCardQuantity(card) {
    if (card.name.includes('◇')) {
      return 1;
    } else {
      return 4;
    }
  }

  return (
    <>
      <Header />
      <Container>
        <Contents>
          {!loading ? (
            <>
              <DeckName>
                <Button text={nameEditDisabled ? '🖉' : '✓'} onClick={() => {setNameEditDisabled(!nameEditDisabled);}} /><input type="text" value={deck.name} onChange={(ev) => {setDeck({...deck, name: ev.target.value})}} disabled={nameEditDisabled} />
              </DeckName>
              <ActionButtons>
                <Button text="Reset" onClick={resetDeck} /><Button text="Update" onClick={prepareAndUpdateDeck} />
              </ActionButtons>
              <Separator />
              <Cards>
                {Object.keys(deck.cards.pokemon).map((key) => {
                  const card = deck.cards.pokemon[key];

                  if (!card.remove) {
                    return (
                      <Card key={Math.random()}>
                        <SmallImage>
                          <a href={`/cards/${card.id}`}>
                            <img src={card.imageUrl} alt={card.name} />
                          </a>
                        </SmallImage>
                        <CardQuantity>
                          <CardSpinner
                            value={card.quantity}
                            max={getMaxCardQuantity(card)}
                            increaseFunction={() => {
                              increaseCardCount('pokemon', card.id);
                            }}
                            decreaseFunction={() => {
                              decreaseCardCount('pokemon', card.id);
                            }}
                          />
                          <Button
                            text="Remove"
                            onClick={() => {
                              removeCard('pokemon', card.id);
                            }}
                          />
                        </CardQuantity>
                      </Card>
                    );
                  } else {
                    return false;
                  }
                })}

                {Object.keys(deck.cards.trainer).map((key) => {
                  const card = deck.cards.trainer[key];

                  if (!card.remove) {
                    return (
                      <Card key={Math.random()}>
                        <SmallImage>
                          <a href={`/cards/${card.id}`}>
                            <img src={card.imageUrl} alt={card.name} />
                          </a>
                        </SmallImage>
                        <CardQuantity>
                          <CardSpinner
                            value={card.quantity}
                            max={getMaxCardQuantity(card)}
                            increaseFunction={() => {
                              increaseCardCount('trainer', card.id);
                            }}
                            decreaseFunction={() => {
                              decreaseCardCount('trainer', card.id);
                            }}
                          />
                          <Button
                            text="Remove"
                            onClick={() => {
                              removeCard('trainer', card.id);
                            }}
                          />
                        </CardQuantity>
                      </Card>
                    );
                  } else {
                    return false;
                  }
                })}

                {Object.keys(deck.cards.ace).map((key) => {
                  const card = deck.cards.ace[key];

                  if (!card.remove) {
                    return (
                      <Card key={Math.random()}>
                        <SmallImage>
                          <a href={`/cards/${card.id}`}>
                            <img src={card.imageUrl} alt={card.name} />
                          </a>
                        </SmallImage>
                        <CardQuantity>
                          <CardSpinner
                            value={card.quantity}
                            max={1}
                            increaseFunction={() => {
                              increaseCardCount('ace', card.id);
                            }}
                            decreaseFunction={() => {
                              decreaseCardCount('ace', card.id);
                            }}
                          />
                          <Button
                            text="Remove"
                            onClick={() => {
                              removeCard('ace', card.id);
                            }}
                          />
                        </CardQuantity>
                      </Card>
                    );
                  } else {
                    return false;
                  }
                })}

                {Object.keys(deck.cards.energy).map((key) => {
                  const card = deck.cards.energy[key];

                  if (!card.remove) {
                    return (
                      <Card key={Math.random()}>
                        <SmallImage>
                          <a href={`/cards/${card.id}`}>
                            <img src={card.imageUrl} alt={card.name} />
                          </a>
                        </SmallImage>
                        <CardQuantity>
                          <CardSpinner
                            value={card.quantity}
                            max={59}
                            increaseFunction={() => {
                              increaseCardCount('energy', card.id);
                            }}
                            decreaseFunction={() => {
                              decreaseCardCount('energy', card.id);
                            }}
                          />
                          <Button
                            text="Remove"
                            onClick={() => {
                              removeCard('energy', card.id);
                            }}
                          />
                        </CardQuantity>
                      </Card>
                    );
                  } else {
                    return false;
                  }
                })}
              </Cards>
            </>
          ) : (
            <Loader />
          )}
        </Contents>
      </Container>
    </>
  );
}
