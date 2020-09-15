import { AbstractControl } from '@angular/forms';

export function cnpValidator(control: AbstractControl) {
  return verifyCNP(control);
}

const verifyCNP = (control) => {
  if (control.value) {
    const re = /^\d{1}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(0[1-9]|[1-4]\d| 5[0-2]|99)\d{4}$/;
    let bigSum = 0;
    let ctrlDigit = 0;
    const controlNum: any = '279146358279';
    if (re.test(control.value)) {
      for (let i = 0; i < 12; i++) {
        bigSum += control.value[i] * controlNum[i];
      }
      ctrlDigit = bigSum % 11;
      if (ctrlDigit === 10) {
        ctrlDigit = 1;
      }

      if (ctrlDigit === parseInt(control.value[12], 10)) {
        return null;
      } else {
        return { invalidCnp: true };
      }
    }
    return { invalidCnp: true };
  }

  return null;
};
