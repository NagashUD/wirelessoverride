// src/utils/attributsLoader.ts

export type Attributs = {
  [classe: string]: {
    Force: number;
    Endurance: number;
    Agilité: number;
    Intelligence: number;
    "Tech-Affinité": number;
    Perception: number;
    Chance: number;
  };
};

export async function getAttributs(): Promise<Attributs> {
  const response = await fetch('/data/attributs_base.json');
  if (!response.ok) {
    throw new Error('Erreur de chargement des attributs');
  }
  return await response.json();
}