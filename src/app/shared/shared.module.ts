import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from 'app/theme/material/material.module';

import { SigaAutoCompleteComponent } from './components/autocomplete/autocomplete.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    SigaAutoCompleteComponent
  ],
  exports: [
    SigaAutoCompleteComponent
  ]
})
export class SharedModule { }
