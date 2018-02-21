import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './dossiers.routing';
import { NgaModule } from 'app/theme/nga.module';

import { DossiersComponent } from './dossiers.component';
import { CreateDossierComponent } from './create-dossier/create-dossier.component';
import { CreateDossierPopupComponent } from './create-dossier/create-dossier-popup/create-dossier-popup.component';

import { DossierService } from './dossiers.service';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    routing,
    NgbModule.forRoot(),
  ],
  declarations: [
    DossiersComponent,
    CreateDossierComponent,
    CreateDossierPopupComponent
  ],
  entryComponents: [
    CreateDossierPopupComponent
  ],
  providers: [
    DossierService
  ]
})
export class DossiersModule { }
