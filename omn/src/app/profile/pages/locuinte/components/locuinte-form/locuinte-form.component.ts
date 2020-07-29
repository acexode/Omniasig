import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Locuinte } from 'src/app/shared/models/data/locuinte';
import { LocuinteFormModes } from 'src/app/shared/models/modes/locuinte-form-modes';
import { LocuinteFormService } from '../../services/locuinte-form/locuinte-form.service';
import { selectConfigHelper } from 'src/app/shared/data/select-config-helper';
import { inputConfigHelper } from 'src/app/shared/data/input-config-helper';

@Component({
  selector: 'app-locuinte-form',
  templateUrl: './locuinte-form.component.html',
  styleUrls: ['./locuinte-form.component.scss'],
})
export class LocuinteFormComponent implements OnInit {
  @Input() formMode: LocuinteFormModes = null;
  @Input() dataModel: Locuinte;

  formModes = LocuinteFormModes;
  formGroups: {
    address: FormGroup;
    locuinta: FormGroup;
  } = {
    address: null,
    locuinta: null,
  };
  fieldConfig = {
    county: selectConfigHelper({ label: 'Județ' }),
    city: selectConfigHelper({ label: 'Localitate' }),
    street: selectConfigHelper({ label: 'Strada' }),
    number: inputConfigHelper({
      label: 'Număr',
      type: 'text',
      placeholder: '',
    }),
    entrance: inputConfigHelper({
      label: 'Scara (opțional)',
      type: 'text',
      placeholder: '',
    }),
    apartment: inputConfigHelper({
      label: 'Apartament',
      type: 'text',
      placeholder: '',
    }),
    postalCode: inputConfigHelper({
      label: 'Cod poștal',
      type: 'text',
      placeholder: '',
    }),
    name: inputConfigHelper({
      label: 'Vrei să dai o denumire acestui profil? (opțional)',
      type: 'text',
      placeholder: '',
    }),
  };
  list = [
    { id: 1, label: 'label1' },
    { id: 2, label: 'label1' },
  ];
  constructor(private fb: FormBuilder, private formS: LocuinteFormService) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.formGroups.address = this.formS.buildAddressSubform();
    this.formGroups.locuinta = this.formS.buildLocuinteSubform();
  }
}
