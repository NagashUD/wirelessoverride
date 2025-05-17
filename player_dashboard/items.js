const Items = {
  ressources: {
    essence: {
      id: "essence",
      nom: "Bidon d'Essence",
      description: "Permet de faire fonctionner certains véhicules.",
      stackable: true,
      icone: "essence.png",
      valeur: 50,
      type: "consommable",
      rarete: "commun",
      niveau: 1,
      poids: 1,
      utilisable: false
    },
    // ...
  },
  armes: {
    // ...
  },
  consommables: {
    // ...
  },
  implants: {
    // ...
  }
};

export function getItem(id) {
  for (const categorie in Items) {
    if (Items[categorie][id]) {
      return JSON.parse(JSON.stringify(Items[categorie][id]));
    }
  }
  console.warn(`Item introuvable : ${id}`);
  return null;
}

export default Items;