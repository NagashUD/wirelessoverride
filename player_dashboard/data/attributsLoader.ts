// src/utils/attributsLoader.ts
import attributs from '../data/attributs_base.json';

type Attributs = {
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

export const getAttributs = (): Attributs => {
  return attributs as Attributs;
};
