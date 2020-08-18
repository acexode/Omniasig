import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { IonDateTimeConfig } from 'src/app/shared/models/component/ion-datetime-config';

@Component({
  selector: 'app-insurance-period',
  templateUrl: './insurance-period.component.html',
  styleUrls: ['./insurance-period.component.scss'],
})
export class InsurancePeriodComponent implements OnInit {
  newProp: IonDateTimeConfig = {
    displayFormat: "DD/MM/YYYY",
    inputLabel: {
      text: "Date"
    },
    pickerFormat: "MMM D, YYYY"
  }

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {}
}
