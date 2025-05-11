// src/utils/competencesLoader.ts

export type Competences = {
  [classe: string]: string[];
};

export async function getCompetences(): Promise<Competences> {
  const response = await fetch('/data/competences.json');
  if (!response.ok) {
    throw new Error('Erreur de chargement des compétences');
  }
  return await response.json();
}