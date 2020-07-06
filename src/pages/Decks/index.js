import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { showDecks, deleteDeck, compressDeck } from '../../utils/deckStorage';

import Header from '../../components/Header';
import Loader from '../../components/Loader';
import Separator from '../../components/Separator';
import Button from '../../components/Button';
import CardTypes from '../../components/CardTypes';
import PopUp from '../../components/PopUp';

import { Container, Contents, DeckList, Deck, EmptyDeck, DeckInfo, Formats, Format, TotalCards, ActionButtons } from './styles';

export default function Decks() {
  const history = useHistory();
  const deckInputRef = useRef();

  const [deckList, setDeckList] = useState();
  const [loading, setLoading] = useState(true);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [popUpContents, setPopUpContents] = useState();
  const [popUpButtons, setPopUpButtons] = useState();

  useEffect(() => {
    const decks = showDecks();

    setDeckList(decks);

    setLoading(false);
  }, []);

  function copyDeckLinkToClipboard(deckID) {
    const compressedDeck = compressDeck(deckID);

    deckInputRef.current.value = `${window.location.origin}/decks/shared/${compressedDeck}`;
    deckInputRef.current.focus();
    deckInputRef.current.select();

    document.execCommand('copy');
  }

  function checkDeleteDeck(deckID) {
    setPopUpContents((<p>Are you sure you want to delete this deck? This action is permanent and cannot be undone!</p>));
    setPopUpButtons([['Yes', () => {deleteDeck(deckID); setDeckList(showDecks()); setIsPopUpVisible(false);}], ['No', () => {setIsPopUpVisible(false);}]]);
    setIsPopUpVisible(true);
  }

  window.onstorage = (ev) => {
    if (ev.key === 'PKMNDecks') {
      setDeckList(showDecks());
    }
  };

  return (
    <>
      <Header />
      <Container>
        <input
          ref={deckInputRef}
          type="text"
          defaultValue=""
          style={{
            position: 'absolute',
            left: '0',
            top: '0',
            zIndex: '-9999',
          }}
        />
        <Contents>
          {!loading ? (
            <DeckList>
              {Object.keys(deckList).map((deckID) => {
                const deck = deckList[deckID];

                return (
                  <Deck key={Math.random()}>
                    <h2 title={deck.name}>{deck.name}</h2>
                    <Separator width="80%" />
                    <DeckInfo>
                      <Formats>
                        <Format className={!deck.allowed_formats?.standard && 'invalid'}>
                          {deck.allowed_formats.standard ? '✓' : '×'} Standard
                        </Format>
                        <Format className={!deck.allowed_formats?.expanded && 'invalid'}>
                          {deck.allowed_formats.expanded ? '✓' : '×'} Expanded
                        </Format>
                      </Formats>
                      <TotalCards>
                        <CardTypes
                          total={deck.totals.total_cards}
                          pokemon={deck.totals.pokemon_cards}
                          trainer={deck.totals.trainer_cards}
                          ace={deck.totals.ace_cards}
                          energy={deck.totals.energy_cards}
                        />
                      </TotalCards>
                    </DeckInfo>
                    <ActionButtons>
                      <Button text="Share" onClick={() => {copyDeckLinkToClipboard(deckID);}} />
                      <Button text="View / Edit" onClick={() => {history.push(`/decks/${deckID}`)}} />
                      <Button text="Delete" onClick={() => {checkDeleteDeck(deckID);}} />
                    </ActionButtons>
                  </Deck>
                );
              })}
              {Object.keys(deckList).length % 3 === 2 && (
                <EmptyDeck />
              )}
            </DeckList>
          ) : (
            <Loader />
          )}
        </Contents>
      </Container>
      {isPopUpVisible && (
        <PopUp
          contents={popUpContents}
          buttons={popUpButtons}
        />
      )}
    </>
  );
}
