import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";

export class DateValidator {

  constructor() {
  }

  static date(c: FormControl) {
    const dateRegEx = new RegExp(/^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/[0-9]{4}$/);
    return dateRegEx.test(c.value) ? null : { date: true }
  }
}
