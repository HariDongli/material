import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { Router } from '@angular/router';

/**
 * aze
 */
@Component({
  templateUrl: './create-dossier-popup.component.html',
  styleUrls: ['./create-dossier-popup.component.scss'],
})
export class CreateDossierPopupComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateDossierPopupComponent>,
    private router: Router
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    this.dialogRef.close();
    this.router.navigate(['/pages/dashboard']);
  }
}
