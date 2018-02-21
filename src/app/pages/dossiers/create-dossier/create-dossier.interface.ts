export interface Dossier {
  ancnumBenef: string;
  thematique: Thematique;
  departement: number;
  intitule: string;
}

export interface DossierResult extends Dossier {
  id: number;
  noOrdre: number;
}

export interface Thematique {
  id: number;
  code: string;
  libelle: string;
  codeParam?: string;
  libelleParam?: string;
}

export interface Departement {
  id: number;
  libelle: string;
}
