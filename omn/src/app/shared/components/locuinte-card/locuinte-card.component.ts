import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Locuinte, LocuintaState } from '../../models/data/locuinte.interface';

@Component({
  selector: 'app-locuinte-card',
  templateUrl: './locuinte-card.component.html',
  styleUrls: ['./locuinte-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocuinteCardComponent implements OnInit {
  locuintaState = LocuintaState;
  link: string;
  @Input() item: Locuinte;
  constructor() {}

  ngOnInit() {
    switch (this.item.locuintaState) {
      case this.locuintaState.INCOMPLETE:
        this.link = 'incomplete/';
        break;
      case this.locuintaState.INVALID:
        this.link = 'invalid/';
        break;
      default:
        this.link = 'view/';
        break;
    }
  }
}
