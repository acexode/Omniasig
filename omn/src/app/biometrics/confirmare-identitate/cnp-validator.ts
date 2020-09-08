import { Directive } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

export function ValidateCNP(control: AbstractControl): {[key: string]: any} | null  {

    if (control.value ) {        
        var re = /^\d{1}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(0[1-9]|[1-4]\d| 5[0-2]|99)\d{4}$/,
      bigSum = 0,
      rest = 0,
      ctrlDigit = 0,
      controlNum:any = '279146358279',
      i = 0;
      console.log(re.test(control.value))
    if (re.test(control.value)) {
      for (i = 0; i < 12; i++) {
        bigSum += control.value[i] * controlNum[i];
      }
      ctrlDigit = bigSum % 11;
      if (ctrlDigit === 10) {
        ctrlDigit = 1;
      }
      if (ctrlDigit !== parseInt(control.value[12], 10)) {
        console.log(false)
        return { 'cnpValid': false };
        
      } else {
        console.log(true)
        return { 'cnpValid': true };
      }
    }
    return { 'cnpValid': false };
    }
    return null;
}

