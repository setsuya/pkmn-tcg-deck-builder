import { getCard, getSet } from '../api';
import { compressToEncodedURIComponent as compress, decompressFromEncodedURIComponent as decompress } from 'lz-string';

function _getDecks() {
  let storageDecks = {};

  if (localStorage.PKMNDecks && Object.keys(localStorage.PKMNDecks).length) {
    storageDecks = JSON.parse(localStorage.PKMNDecks);
  }

  return storageDecks;
}

function _updateStorage(newObj) {
  const saveObj = JSON.stringify(newObj);

  localStorage.PKMNDecks = saveObj;
}

// eslint-disable-next-line
window._clearStorage = function _clearStorage() {
  let decks = {};

  _updateStorage(decks);
}

export function addToDeck(deck, card, quantity) {
  let decks = _getDecks();

  function calculateTotalsAndFormats() {
    let totalCards = 0;
    let standardLegal = true;
    let expandedLegal = true;

    Object.keys(decks[deck].cards).forEach((type) => {
      const typeContents = decks[deck].cards[type];
      let totalTypeCards = 0;

      Object.keys(typeContents).forEach((card) => {
        totalTypeCards += typeContents[card].quantity;

        if (standardLegal !== false && typeContents[card].formats.standardLegal === false) {
          standardLegal = false;
        }

        if (expandedLegal !== false && typeContents[card].formats.expandedLegal === false) {
          expandedLegal = false;
        }
      });
      
      decks[deck].totals[`${type}_cards`] = totalTypeCards;
      totalCards += totalTypeCards;
    });

    decks[deck].totals.total_cards = totalCards;
    decks[deck].allowed_formats.standard = standardLegal;
    decks[deck].allowed_formats.expanded = expandedLegal;
  }

  if (deck === '__new_deck') {
    deck = createDeck();
    decks = _getDecks();
  }

  if (card.rarity?.includes('ACE')) {
    decks[deck].cards.ace[card.id] = {...card, quantity: quantity};
  } else {
    switch (card.supertype) {
      case 'Pokémon':
        decks[deck].cards.pokemon[card.id] = {...card, quantity: quantity};

        break;
      case 'Trainer':
        decks[deck].cards.trainer[card.id] = {...card, quantity: quantity};

        break;
      case 'Energy':
        decks[deck].cards.energy[card.id] = {...card, quantity: quantity};

        break;
      default:
        break;
    }
  }

  calculateTotalsAndFormats();
  _updateStorage(decks);

  return showDecks();
}

export function updateDeck(deckID, deck) {
  let decks = _getDecks();

  decks[deckID] = deck;

  _updateStorage(decks);

  return showDeck(deckID);
}

export function deleteDeck(deckID) {
  let decks = _getDecks();

  delete decks[deckID];

  _updateStorage(decks);
}

export function createDeck() {
  let decks = _getDecks();

  const creationDate = new Date().getTime();
  const deckID = `deck_${creationDate}`;
  const tempName = `Deck ${creationDate}`;

  decks[deckID] = {
    name: tempName,
    allowed_formats: {
      standard: true,
      expanded: true,
    },
    totals: {
      total_cards: 0,
      energy_cards: 0,
      pokemon_cards: 0,
      trainer_cards: 0,
      ace_cards: 0,
    },
    cards: {
      energy: {},
      pokemon: {},
      trainer: {},
      ace: {},
    },
  };

  _updateStorage(decks);

  return deckID;
}

export function saveSharedDeck(deck) {
  let decks = _getDecks();

  const creationDate = new Date().getTime();
  const deckID = `deck_${creationDate}`;

  decks[deckID] = deck;

  _updateStorage(decks);

  return deckID;
}

export function showDecks() {
  return _getDecks();
}

export function showDeck(deckID) {
  let decks = _getDecks();

  return decks[deckID] || {};
}

export function compressDeck(deckID) {
  let decks = _getDecks();

  const cards = decks[deckID].cards;
  const compressedCards = [];

  Object.keys(cards).forEach((type) => {
    const cardType = cards[type];

    Object.keys(cardType).forEach((card) => {
      compressedCards.push([card, cardType[card].quantity]);
    });
  });

  const compressedDeck = {
    name: decks[deckID].name,
    cards: compressedCards,
  };

  return compress(JSON.stringify(compressedDeck));
}

export async function uncompressDeck(compressedDeck) {
  compressedDeck = JSON.parse(decompress(compressedDeck));
  let sets = {};

  const deckTemplate = {
    name: compressedDeck.name,
    allowed_formats: {
      standard: true,
      expanded: true,
    },
    totals: {
      total_cards: 0,
      energy_cards: 0,
      pokemon_cards: 0,
      trainer_cards: 0,
      ace_cards: 0,
    },
    cards: {
      energy: {},
      pokemon: {},
      trainer: {},
      ace: {},
    },
  };

  for (let i = 0; i < compressedDeck.cards.length; i++) {
    const [cardID, cardQuantity] = compressedDeck.cards[i];
    let setInfo = {};

    let cardInfo = await getCard(cardID);

    if (Object.keys(sets).includes(cardInfo.setCode)) {
      setInfo = sets[cardInfo.setCode];
    } else {
      setInfo = await getSet(cardInfo.setCode);

      sets[cardInfo.setCode] = setInfo;
    }

    cardInfo = {...cardInfo,
      quantity: cardQuantity,
      formats: {
        standardLegal: (cardInfo.supertype === 'Energy' && cardInfo.subtype === 'Basic') ? true : setInfo?.standardLegal || false,
        expandedLegal: (cardInfo.supertype === 'Energy' && cardInfo.subtype === 'Basic') ? true : setInfo?.expandedLegal || false,
      },
    };

    if (cardInfo.rarity.includes('ACE')) {
      deckTemplate.cards.ace[cardInfo.id] = cardInfo;
      deckTemplate.totals.ace_cards += cardInfo.quantity;
    } else {
      switch (cardInfo.supertype) {
        case 'Pokémon':
          deckTemplate.cards.pokemon[cardInfo.id] = cardInfo;
          deckTemplate.totals.pokemon_cards += cardInfo.quantity;

          break;
        case 'Trainer':
          deckTemplate.cards.trainer[cardInfo.id] = cardInfo;
          deckTemplate.totals.trainer_cards += cardInfo.quantity;

          break;
        case 'Energy':
          deckTemplate.cards.energy[cardInfo.id] = cardInfo;
          deckTemplate.totals.energy_cards += cardInfo.quantity;

          break;
        default:
          break;
      }
    }

    if (deckTemplate.allowed_formats.standardLegal !== false && cardInfo.formats.standardLegal === false) {
      deckTemplate.allowed_formats.standard = false;
    }

    if (deckTemplate.allowed_formats.expandedLegal !== false && cardInfo.formats.expandedLegal === false) {
      deckTemplate.allowed_formats.expanded = false;
    }

    deckTemplate.totals.total_cards += cardInfo.quantity;
  }

  return deckTemplate;
}
