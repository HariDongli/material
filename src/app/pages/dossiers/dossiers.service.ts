import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { Dossier, Thematique, Departement, DossierResult } from './create-dossier/create-dossier.interface';
import { environment } from 'environments/environment';

@Injectable()
export class DossierService {
  // tempUrl: string = '/siga/dossier/T003';
  tempDossierURL = '/assets/mock/dossier.json';
  tempThematiquesURL = '/assets/mock/thematiques.json';
  tempDeptsURL = '/assets/mock/depts.json';

  constructor(
    private httpClient: HttpClient
  ) { }

  getThematiques(): Observable<Thematique[]> {
    // return this.httpClient.get<Thematique[]>(`${environment.BASE_LOCAL_URL}` + this.tempThematiquesURL);
    return this.httpClient.get<Thematique[]>(`${environment.BASE_LOCAL_URL}` + '/listValeur/thematiques');
  }

  createDossier(dossier: Dossier) {
    const url = `${environment.BASE_LOCAL_URL}` + '/dossier';
    return this.httpClient.post<DossierResult>(url, dossier);
  }

  // getDepts(): Observable<Departement[]> {
  //   return this.httpClient.get<Departement[]>(`${environment.BASE_API_URL}` + this.tempDeptsURL);
  // }

  // getInfoDossier(): Observable<Dossier> {
  //   return this.httpClient.get<Dossier>(`${environment.BASE_LOCAL_URL}` + this.tempDossierURL);
  // }
}
