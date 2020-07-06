export function formatEnergy(text) {
  return text.replace(/(Grass|Fire|Water|Lightning|Psychic|Fighting|Darkness|Metal|Colorless|Fairy|Dragon(?!air|ite))/g,
    (p1) => {
      return `<img class="text_type_icon" src="/img/type_icons/${p1.toLowerCase()}.png" />`;
    }
  );
}

export function formatItalics(text) {
  return text.replace(/(\([^)]+\))/g,
    (p1) => {
      return `<i>${p1}</i>`;
    }
  );
}

export function formatItalicsAndEnergy(text) {
  return text.replace(/(Grass|Fire|Water|Lightning|Psychic|Fighting|Darkness|Metal|Colorless|Fairy|Dragon(?!air|ite))/g,
    (p1) => {
      return `<img class="text_type_icon" src="/img/type_icons/${p1.toLowerCase()}.png" />`;
    }
  ).replace(/(\([^)]+\))/g,
    (p1) => {
      return `<i>${p1}</i>`;
    }
  );
}
