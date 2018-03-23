import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from 'app/theme/material/material.module';
import {ReactiveFormsModule } from '@angular/forms'
import { SigaAutoCompleteComponent } from './components/autocomplete/autocomplete.component';
import { MatAutocompleteModule } from "@angular/material/autocomplete";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatAutocompleteModule
  ],
  declarations: [
    SigaAutoCompleteComponent
  ],
  exports: [
    SigaAutoCompleteComponent
  ]
})
export class SharedModule { }
