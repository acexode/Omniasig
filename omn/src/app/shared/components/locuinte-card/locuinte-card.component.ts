import { Component, OnInit, Input } from '@angular/core';
import { Locuinte } from '../../models/data/locuinte.interface';

@Component({
  selector: 'app-locuinte-card',
  templateUrl: './locuinte-card.component.html',
  styleUrls: ['./locuinte-card.component.scss'],
})
export class LocuinteCardComponent implements OnInit {
  @Input() item: Locuinte;
  constructor() {}

  ngOnInit() {}
}
