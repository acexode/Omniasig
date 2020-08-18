import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { IonDateTimeConfig } from 'src/app/shared/models/component/ion-datetime-config';

@Component({
  selector: 'app-insurance-period',
  templateUrl: './insurance-period.component.html',
  styleUrls: ['./insurance-period.component.scss'],
})
export class InsurancePeriodComponent implements OnInit {
  @Input() minDate;
  @Input() maxDate;

  newProp: IonDateTimeConfig = {
    displayFormat: "DD/MM/YYYY",
    inputLabel: {
      text: "Data de început",
      classes: "input-label"
    },
    pickerOptions: {
      cssClass: 'custom-datepicker',
    },
    pickerFormat: "MMM D, YYYY",
    placeholder: "Selectează"
  }

  constructor() {}

  ngOnInit() {}
}
