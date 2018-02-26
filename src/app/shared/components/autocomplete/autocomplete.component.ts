import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, Input, AfterViewInit, OnDestroy, HostBinding, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldControl, MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

class AutoCompleteInput {
  constructor(public testValue: string) {
  }
}

@Component({
  selector: 'siga-auto-complete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: SigaAutoCompleteComponent
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SigaAutoCompleteComponent),
      multi: true
    }
  ],
})
export class SigaAutoCompleteComponent implements MatFormFieldControl<AutoCompleteInput>, AfterViewInit, OnDestroy, ControlValueAccessor {
  /** Static control ID generator */
  static nextId = 0;
  /**
   * Stream that emits whenever the state of the control changes such that the parent `MatFormField`
   * needs to run change detection.
   */
  stateChanges = new Subject<void>();
  parts: FormGroup;
  focused = false;
  ngControl = null;
  errorState = false;
  controlType = 'siga-autocomplete';

  @HostBinding('class.floating') get shouldLabelFloat() { return this.focused || !this.empty; }
  @HostBinding() id = `siga-autocomplete-${SigaAutoCompleteComponent.nextId++}`;
  @HostBinding('attr.aria-describedby') describedBy = '';

  @Input()
  get placeholder() { return this._placeholder; }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get required() { return this._required; }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled() { return this._disabled; }
  set disabled(dis) {
    this._disabled = coerceBooleanProperty(dis);
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): AutoCompleteInput | null {
    const n = this.parts.value as AutoCompleteInput;
    if (n.testValue) {
      return new AutoCompleteInput(n.testValue);
    }
    return null;
  }
  set value(value: AutoCompleteInput | null) {
    console.log(value);
    this.writeValue(value.testValue);
    this.stateChanges.next();
  }

  @Input()
  set formControlName(formName) {
    this._formControlName = formName;
  }
  private _formControlName: string;

  // ADDITIONNAL
  @Input() autoCompleteControl: MatAutocomplete;
  @Input() tabIndex: string;

  private subs: Subscription[] = [];

  constructor(fb: FormBuilder, private fm: FocusMonitor, private elRef: ElementRef) {
    this.subs.push(
      fm.monitor(elRef.nativeElement, true).subscribe((origin) => {
        this.focused = !!origin;
        this.stateChanges.next();
      })
    );

    this.parts = fb.group({
      'singleValue': '',
    });

    this.subs.push(this.parts.valueChanges.subscribe((value: string) => {
      this.propagateChange(value);
    }));
  }

  ngAfterViewInit() {
    console.log(this.autoCompleteControl);
    this.autoCompleteControl.optionSelected.subscribe((event: MatAutocompleteSelectedEvent) => {
      console.log(event.option.value);
      this.value = event.option.value;
    })
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.subs.forEach(s => s.unsubscribe());
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }

  get empty() {
    return !this.value;
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      this.elRef.nativeElement.querySelector('input').focus();
    }
  }

  focus() {
    this.elRef.nativeElement.querySelector('input').focus();
  }


  // CONTROL VALUE ACCESSOR
  private propagateChange = (_: any) => { };

  public writeValue(a: string) {
    console.log('wtf');

    if (a && a !== '') {
      console.log('value => ', a);
      this.parts.setValue({
        'singleValue': a
      });
    }
  }
  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn: any): void {
    return;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}


