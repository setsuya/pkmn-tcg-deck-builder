import axios from 'axios';

const _api = axios.create({
  baseURL: 'https://api.pokemontcg.io/v1/',
});

export async function getSets() {
  const { data } = await _api.get('/sets');

  return data.sets;
}

export async function getTypes() {
  const { data } = await _api.get('/types');

  return data.types;
}

export async function getSupertypes() {
  const { data } = await _api.get('/supertypes');

  return data.supertypes;
}

export async function getSubtypes() {
  const { data } = await _api.get('/subtypes');

  return data.subtypes;
}

export async function searchCards(params) {
  let searchParams = [];

  Object.keys(params).forEach((key) => {
    if (params[key]) {
      searchParams.push(`${key}=${params[key]}`);
    }
  });

  const data = await _api.get(`/cards?${searchParams.join('&')}`);

  return data;
}

export async function getCard(cardID) {
  const { data } = await _api.get(`/cards/${cardID}`);

  return data.card;
}

export async function getSet(setID) {
  const { data } = await _api.get(`/sets/${setID}`);

  return data.set;
}

export async function searchLegalSets(format) {
  const { data } = await _api.get(`/sets?${format}Legal=true`);

  return data.sets;
}
