import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class LocuinteFormService {
  constructor(private fb: FormBuilder) {}

  buildLocuinteSubform() {
    // info: {
    //   type: string;
    //   resistenceStructure: string;
    //   buildYear: number;
    //   value: {
    //     currency: string;
    //     sum: string;
    //   }
    //   occupancy: string;
    //   usablesurface: number;
    //   heightRegime: number;
    //   roomCount: number;
    //   alarm: boolean;
    // }
    return this.fb.group({
      type: this.fb.control('', Validators.required),
      resistenceStructure: this.fb.control('', Validators.required),
      buildYear: this.fb.control('', Validators.required),
      valueCurrency: this.fb.control('', Validators.required),
      valueSum: this.fb.control('', Validators.required),
      occupancy: this.fb.control('', Validators.required),
      usableSurface: this.fb.control('', Validators.required),
      heightRegime: this.fb.control(1, Validators.required),
      roomCount: this.fb.control(1, Validators.required),
      alarm: this.fb.control(false, Validators.required),
    });
  }

  buildAddressSubform() {
    // address: {
    //   county: string;
    //   city: string;
    //   street: string;
    //   number: number;
    //   // Scara bloc.
    //   entrance: string;
    // }
    return this.fb.group({
      county: this.fb.control('', Validators.required),
      city: this.fb.control('', Validators.required),
      street: this.fb.control('', Validators.required),
      number: this.fb.control('', Validators.required),
      entrance: this.fb.control(''),
      apartment: this.fb.control('', Validators.required),
      postalCode: this.fb.control('', Validators.required),
    });
  }
}
