import Items from './items.js';

export function getStockByCategorie(categorie) {
  console.log("→ Catégorie demandée :", categorie);
  console.log("→ Contenu :", Items[categorie]);
  return Items[categorie] || [];
}