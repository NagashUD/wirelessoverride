import Items from './items.js';

export function getStockByCategorie(categorie) {
  if (!Items[categorie]) {
    console.warn(`Catégorie introuvable : ${categorie}`);
    return [];
  }
  return Object.values(Items[categorie]);
}
