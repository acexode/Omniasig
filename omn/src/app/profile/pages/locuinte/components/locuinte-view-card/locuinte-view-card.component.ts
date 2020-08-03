import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-locuinte-view-card',
  templateUrl: './locuinte-view-card.component.html',
  styleUrls: ['./locuinte-view-card.component.scss'],
})
export class LocuinteViewCardComponent implements OnInit {
  @Input() variant;
  constructor() {}

  ngOnInit() {}
}
