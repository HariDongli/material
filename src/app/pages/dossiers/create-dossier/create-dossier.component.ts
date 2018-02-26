import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatDialog, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Router, NavigationStart } from '@angular/router';

import { Dossier, Thematique, Departement } from './create-dossier.interface';
import { CreateDossierPopupComponent } from './create-dossier-popup/create-dossier-popup.component';

import { DossierService } from './../dossiers.service';
import { Subscription } from 'rxjs/Subscription';

/**
 * aze
 */
@Component({
  selector: 'siga-create-dossier',
  templateUrl: './create-dossier.component.html',
  styleUrls: ['./create-dossier.component.scss'],
})
export class CreateDossierComponent implements OnInit, OnDestroy {
  /**
   *
   */
  thematiques: Thematique[] = null;

  /**
   * a
   */
  filteredThematiques: Observable<Thematique[]>;

  /**
   *
   */
  depts: Departement[] = [
    {
      id: 9,
      libelle: 'Ariège'
    },
    {
      id: 31,
      libelle: 'Haute-Garonne'
    },
    {
      id: 32,
      libelle: 'Gers'
    },
    {
      id: 33,
      libelle: 'Gironde'
    },
    {
      id: 40,
      libelle: 'Landes'
    },
    {
      id: 47,
      libelle: 'Lot-et-Garonne'
    },
    {
      id: 64,
      libelle: 'Pyrénées-Atlantiques'
    },
    {
      id: 65,
      libelle: 'Hautes-Pyrénées'
    },
    {
      id: 81,
      libelle: 'Tarn'
    },
    {
      id: 82,
      libelle: 'Tarn-et-Garonne'
    }
  ];

  /**
   * z
   */
  filteredDepts: Observable<Departement[]>;

  /**
   * e
   */
  formDossier: FormGroup;

  /**
   *
   */
  navigationWatcher: Subscription;

  /**
   *
   */
  snackbarSubscription: Subscription;

  /**
   * TODO : Disallow multi-click
   */
  submitted = false;

  /**
   * e
   * @param formBuilder a
   * @param dossierService z
   */
  constructor(
    public dialog: MatDialog,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private router: Router,
    private dossierService: DossierService,
  ) {
    // TO DO ! Guard with canDeactivate()
    // this.navigationWatcher = router.events.subscribe(event => {
    //   if (event instanceof NavigationStart) {
    //     console.log('NAV !');
    //     if (!this.formDossier.pristine) {
    //       this.openDialog();
    //     }
    //   }
    // });
  }

  /**
   * a
   */
  ngOnInit() {
    // TODO : Move elsewhere
    const BenefRegex: RegExp = /(\d){8}([A-Za-z])/;

    this.formDossier = this.formBuilder.group({
      thematique: [[null], [Validators.required, this.thematiqueValidator()]],
      dept: ['', [Validators.required, this.deptValidator()]],
      intitule: ['', [Validators.required, Validators.maxLength(80)]],
      // TODO : PATTERN ON BENEF
      benef_number: ['', [Validators.required, Validators.maxLength(9), Validators.pattern(BenefRegex)]],
      benef_libelle: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(9)]]
    });

    // Bénéficiaire libelle handler (TEMPORARY)
    this.formDossier.get('benef_number').valueChanges.subscribe(
      (value) => {
        if (this.formDossier.get('benef_number').valid) {
          this.formDossier.get('benef_libelle').setValue('BOUCHON');
        } else {
          this.formDossier.get('benef_libelle').setValue('');
        }
      }
    );

    this.dossierService.getThematiques()
      .subscribe(thematiques => {
        this.thematiques = thematiques;
        // Allow auto-complete filtering
        this.filteredThematiques = this.formDossier.get('thematique').valueChanges.pipe(
          startWith(''),
          map(value => value ? this.filterThematiques(value) : this.thematiques.slice())
        );
      });

    // this.dossierService.getDepts()
    //   .subscribe(depts => {
    //     this.depts = depts;
    //     // Allow auto-complete filtering
    //     this.filteredDepts = this.formDossier.get('dept').valueChanges.pipe(
    //       startWith(''),
    //       map(value => value ? this.filterDepts(value) : this.depts.slice())
    //     );
    //   });

    this.filteredDepts = this.formDossier.get('dept').valueChanges.pipe(
      startWith(''),
      map(value => value ? this.filterDepts(value) : this.depts.slice())
    );
  }

  /**
   * Custom validator for thematiques
   */
  thematiqueValidator() {
    return (group: FormGroup): { [key: string]: any } => {
      let foundValue = false;

      if (this.thematiques) {
        this.thematiques.forEach((thematique) => {
          if (thematique.id === group.value.id) {
            foundValue = true;
          }
        });
      }

      if (!foundValue && group.value) {
        return { 'thematiqueNotFound': true };
      }

      return null;
    };
  }

  displayThematique(thematique: Thematique) {
    console.log('test1 => ', thematique);

    if (thematique) {
      return `${thematique.code} - ${thematique.libelle}`;
    }
  }

  deptValidator() {
    return (group: FormGroup): { [key: string]: any } => {
      let foundValue = false;

      if (this.depts) {
        this.depts.forEach((dept) => {
          if (dept.id === group.value.id) {
            foundValue = true;
          }
        });
      }

      if (!foundValue && group.value) {
        return { 'deptNotFound': true };
      }

      return null;
    };
  }

  displayDept(dept: Departement) {
    if (dept) {
      return `${(dept.id < 10) ? '0' + dept.id : dept.id} - ${dept.libelle}`;
    }
  }

  /**
   *
   * @param value
   */
  filterDepts(value: string) {
    return this.depts.filter(dept => {
      return (dept.id.toString().toLowerCase().search(value.toString().toLowerCase()) !== -1) ||
        (dept.libelle.toLowerCase().search(value.toString().toLowerCase()) !== -1)
    });
  }

  /**
   *
   * @param value
   */
  filterThematiques(value: string) {
    console.log('test2 => ', value);

    return this.thematiques.filter(thematiques => {
      return (thematiques.code.toLowerCase().search(value.toString().toLowerCase()) !== -1) ||
        (thematiques.libelle.toLowerCase().search(value.toString().toLowerCase()) !== -1)
    });
  }

  /**
   * TODO : improve
   */
  quit() {
    if (!this.formDossier.pristine) {
      this.openDialog();
    } else {
      this.router.navigate(['/pages/dashboard']);
    }
  }

  openDialog(): void {
    this.dialog.open(CreateDossierPopupComponent, {
      width: '350px',
    });
  }

  /**
   *
   */
  onSubmit() {
    const deptId = (this.formDossier.get('dept').value as Departement).id
    this.submitted = true;
    const formattedDossier: any = {
      ancnumBenef: (this.formDossier.get('benef_number').value as string).toUpperCase(),
      departement: (deptId < 10) ? '0' + deptId : deptId,
      intitule: this.formDossier.get('intitule').value,
      thematique: (this.formDossier.get('thematique').value as Thematique)
    }

    console.log(formattedDossier);

    const snackbarConfig: MatSnackBarConfig = {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    };

    this.dossierService.createDossier(formattedDossier)
      .subscribe((dossier) => {
        const formattedDossierNumber = `${dossier.thematique.code}-${dossier.departement}-${this.manageFloatingZeros(dossier.noOrdre)}`
        const snackBarAction = this.snackbar.open(`Le dossier ${formattedDossierNumber} a bien été créé.`, 'X', snackbarConfig);
        this.snackbarSubscription = snackBarAction.afterDismissed()
          .subscribe(() => {
            this.submitted = false;
          });
      },
        (error: any) => {
          const snackBarAction = this.snackbar.open(`La création du dossier a échoué. Contacter l'administrateur.`, 'X', snackbarConfig);
          this.snackbarSubscription = snackBarAction.afterDismissed()
            .subscribe(() => {
              console.error(error);
              this.submitted = false;
            });
        });
  }

  ngOnDestroy() {
    if (this.navigationWatcher) {
      this.navigationWatcher.unsubscribe();
    }
    if (this.snackbarSubscription) {
      this.snackbarSubscription.unsubscribe();
    }
  }

  manageFloatingZeros(value: number) {
    let result = '';
    while (result.length < 5 - value.toString().length) {
      result += '0';
    }
    result += value.toString();
    return result;
  }
}
