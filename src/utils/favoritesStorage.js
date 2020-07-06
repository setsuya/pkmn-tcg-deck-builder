function _getFavorites() {
  let storageFavorites = {};

  if (localStorage.PKMNFavorites && Object.keys(localStorage.PKMNFavorites).length) {
    storageFavorites = JSON.parse(localStorage.PKMNFavorites);
  }

  return storageFavorites;
}

function _updateStorage(newObj) {
  const saveObj = JSON.stringify(newObj);

  localStorage.PKMNFavorites = saveObj;
}

// eslint-disable-next-line
window._clearStorage = function _clearStorage() {
  let favorites = {};

  _updateStorage(favorites);
}

export function addToFavorites(card) {
  let favorites = _getFavorites();

  favorites[card.id] = card;

  _updateStorage(favorites);
}

export function removeFromFavorites(cardID) {
  let favorites = _getFavorites();

  delete favorites[cardID];

  _updateStorage(favorites);
}

export function showFavorites() {
  return _getFavorites();
}

export function showFavorite(cardID) {
  let favorites = _getFavorites();

  return favorites[cardID] || {};
}

export function cardInFavorites(cardID) {
  let favorites = _getFavorites();

  if (Object.keys(favorites).includes(cardID)) {
    return true;
  } else {
    return false;
  }
}
