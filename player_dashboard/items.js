


const Items = {
  armes: [
    {
      id: "arme1",
      nom: "Pistolet Laser",
      icone: "assets/img/items/pistolet_laser.png",
      valeur: 250,
      description: "Un pistolet laser de moyenne portée, efficace contre les ennemis robotiques.",
      effet: "Inflige des dégâts à distance.",
      rarete: "rare",
      type: "arme",
      categorie: "armes"
    },
    {
      id: "arme2",
      nom: "Fusil à Plasma",
      icone: "assets/img/items/fusil_plasma.png",
      valeur: 450,
      description: "Fusil puissant tirant des rafales de plasma surchauffé.",
      effet: "Dégâts élevés, chance de brûlure.",
      rarete: "épique",
      type: "arme",
      categorie: "armes"
    }
  ],

  armures: [
    {
      id: "armure1",
      nom: "Armure légère en kevlar",
      icone: "assets/img/items/armure_kevlar.png",
      valeur: 300,
      description: "Armure légère offrant une bonne protection contre les balles standards.",
      effet: "Réduit les dégâts physiques de 20%.",
      rarete: "commun",
      type: "armure",
      categorie: "armures"
    },
    {
      id: "armure2",
      nom: "Armure blindée lourde",
      icone: "assets/img/items/armure_lourde.png",
      valeur: 700,
      description: "Armure lourde augmentant fortement la résistance aux attaques.",
      effet: "Réduit les dégâts physiques de 50%, ralentit la mobilité.",
      rarete: "rare",
      type: "armure",
      categorie: "armures"
    }
  ],

  cyber: [
    {
      id: "cyber1",
      nom: "Implant neural X2",
      icone: "assets/img/items/implant_neural.png",
      valeur: 800,
      description: "Améliore la vitesse de traitement mental et la mémoire.",
      effet: "Augmente la rapidité des compétences spéciales.",
      rarete: "épique",
      type: "cybernétique",
      categorie: "cyber"
    },
    {
      id: "cyber2",
      nom: "Prothèse bras cybernétique",
      icone: "assets/img/items/prothese_bras.png",
      valeur: 1200,
      description: "Bras cybernétique offrant une force surhumaine.",
      effet: "Augmente la force physique de 40%.",
      rarete: "légendaire",
      type: "cybernétique",
      categorie: "cyber"
    }
  ],

  ressources: [
    {
    id: "essence1",
    nom: "Bidon d'essence",
    icone: "essence.png",
    valeur: 30,
    quantity: 5,
    maxStack: 50,
    description: "Un bidon de 20L d'essence raffiné, utilisé pour alimenter divers véhicules ou générateurs.",
    effet: "Permet de ravitailler un véhicule ou d’alimenter un générateur.",
    rarete: "commun",
    type: "consommable",
    categorie: "ressources",
    cooldown: 0,
    tradable: true

    },
    {
      id: "electronique1",
      nom: "Batterie usée",
      icone: "batterie.png",
      valeur: 40,
      description: "Une vieille batterie de voiture encore partiellement utilisable.",
      effet: "Peut être recyclée ou utilisée pour fabriquer un générateur.",
      rarete: "commun",
      type: "composant",
      categorie: "ressources"
    }
  ],

  transport: [
    {
      id: "vehicule1",
      nom: "Moto électrique",
      icone: "assets/img/items/moto_electrique.png",
      valeur: 1500,
      description: "Moto rapide et silencieuse, idéale pour se déplacer en ville.",
      effet: "Permet un déplacement rapide.",
      rarete: "rare",
      type: "véhicule",
      categorie: "transport"
    },
    {
      id: "vehicule2",
      nom: "Véhicule tout-terrain",
      icone: "assets/img/items/vehicule_tt.png",
      valeur: 3000,
      description: "Véhicule robuste adapté aux terrains difficiles.",
      effet: "Permet de traverser des zones accidentées.",
      rarete: "épique",
      type: "véhicule",
      categorie: "transport"
    }
  ],

  revente: [
    // Ici tu peux mettre des objets à revendre, ou gérer différemment
  ],

  marche: [
    // Marché des joueurs, tu peux gérer ça plus tard
  ]
};
// ✅ Définir la fonction getItem ici :
export function getItem(id) {
  for (const categorie in Items) {
    const item = Items[categorie].find(item => item.id === id);
    if (item) return item;
  }
  return null;
}

// ✅ Exporter les Items aussi :
export default Items;

function getStockByCategorie(categorie) {
  return Items[categorie] || [];
}