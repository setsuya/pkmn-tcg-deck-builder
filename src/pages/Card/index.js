import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getCard, getSet } from '../../api';
import { addToDeck, showDecks } from '../../utils/deckStorage';
import { addToFavorites, removeFromFavorites, cardInFavorites } from '../../utils/favoritesStorage';

import Header from '../../components/Header';
import CardData from '../../components/Card';
import Loader from '../../components/Loader';
import Separator from '../../components/Separator';
import Input from '../../components/Input';
import SelectButton from '../../components/SelectButton';
import Button from '../../components/Button';

import { Container, Contents, DeckOptions } from './styles';

export default function Card({ match }) {
  const history = useHistory();
  const { cardID } = match.params;

  const [deckList, setDeckList] = useState();
  const [selectedDeck, setSelectedDeck] = useState('__new_deck');
  const [card, setCard] = useState();
  const [favoritesStatus, setFavoritesStatus] = useState(false);
  const [set, setSet] = useState();
  const [maxQuantity, setMaxQuantity] = useState();
  const [cardQuantity, setCardQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const decks = showDecks();

    setDeckList(parseDecks(decks));
  }, []);

  useEffect(() => {
    async function getCardData() {
      try {
        const data = await getCard(cardID);
        const setData = await getSet(data.setCode);

        if (data.supertype === 'Energy') {
          setMaxQuantity(59);
        } else {
          if (data.rarity?.includes('ACE') || data.name.includes('◇')) {
            setMaxQuantity(1)
          } else {
            setMaxQuantity(4);
          }
        }

        setFavoritesStatus(cardInFavorites(data.id));
        setCard({...data,
          formats: {
            standardLegal: (data.supertype === 'Energy' && data.subtype === 'Basic') ? true : setData?.standardLegal || false,
            expandedLegal: (data.supertype === 'Energy' && data.subtype === 'Basic') ? true : setData?.expandedLegal || false,
          },
        });
        setSet(setData || {});
        setLoading(false);
      } catch (err) {
        history.replace('/');
      }
    }

    getCardData();
  }, [cardID, history]);

  function parseDecks(decks) {
    let deckArray = [];

    Object.keys(decks).forEach((deck) => {
      deckArray.push({value: deck, text: `${decks[deck].name} (${decks[deck].totals?.total_cards})`});
    });

    return deckArray;
  }

  window.onstorage = (ev) => {
    if (ev.key === 'PKMNDecks') {
      setDeckList(parseDecks(showDecks()));
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Contents>
          {!loading ? (
            <>
              <DeckOptions>
                <Input
                  type="number"
                  min={1}
                  max={maxQuantity}
                  step={1}
                  defaultValue={1}
                  onChange={(ev) => {
                    setCardQuantity(Number(ev.target.value));
                  }}
                />
                <SelectButton
                  text="Add to..."
                  value={selectedDeck}
                  defaultOption={{value: '__new_deck', text: '[New deck]'}}
                  options={deckList}
                  onClick={() => {
                    const response = addToDeck(selectedDeck, card, cardQuantity);
                    setDeckList(parseDecks(response));
                  }}
                  onChange={(ev) => {
                    setSelectedDeck(ev.target.value);
                  }}
                />
                <Button
                  text={favoritesStatus ? "★" : "☆"}
                  onClick={favoritesStatus ? (
                    () => {
                      removeFromFavorites(card.id);
                      setFavoritesStatus(false);
                    }
                  ) : (
                    () => {
                      addToFavorites(card);
                      setFavoritesStatus(true);
                    }
                  )}
                />
              </DeckOptions>
              <Separator />
              <CardData card={card || {}} set={set || []} />
            </>
          ) : (
            <Loader />
          )}
        </Contents>
      </Container>
    </>
  );
}
