import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './dashboard.routing';
import { NgaModule } from 'app/theme/nga.module';

import { DashboardComponent } from './dashboard.component';
import { AccueilComponent } from './accueil/accueil.component';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    routing,
    NgbModule.forRoot(),
  ],
  declarations: [
    DashboardComponent,
    AccueilComponent,
  ]
})
export class DashboardModule { }
