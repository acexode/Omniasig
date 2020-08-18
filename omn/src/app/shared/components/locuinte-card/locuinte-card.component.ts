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
  locuinteState = LocuintaState;
  @Input() item: Locuinte;
  constructor() {}

  ngOnInit() {}
}
