import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateDossierComponent } from './create-dossier/create-dossier.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'creation', pathMatch: 'full' },
      { path: 'creation', component: CreateDossierComponent },
    ]
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
