// src/utils/competencesLoader.ts
import competences from '../data/competences.json';

type Competences = {
  [classe: string]: string[];
};

export const getCompetences = (): Competences => {
  return competences as Competences;
};
