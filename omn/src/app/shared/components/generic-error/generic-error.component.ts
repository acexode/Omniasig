import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IonTextItem } from './../../models/component/ion-text-item';

@Component({
  selector: 'app-generic-error',
  templateUrl: './generic-error.component.html',
  styleUrls: ['./generic-error.component.scss'],
})
export class GenericErrorComponent implements OnInit, OnChanges {
  @Input() title = {
    text: 'Ne pare rău...',
    class: '',
  };
  @Input() texts: Array<IonTextItem> = [
    {
      classes: 'ion-text-center',
      text:
        `A fost identificată lipsa acordului tău privind procesare datelor personale.
        Te rugăm să iei legătura cu un reprezentant OMNIASIG.`,
    },
  ];
  @Output() doLogout: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.title == null) {
      this.title = {
        text: 'Ne pare rău...',
        class: '',
      };
    }
  }

  logout() {
    this.doLogout.emit(true);
  }
}
