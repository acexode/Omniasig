import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-loading-placeholder',
  templateUrl: './loading-placeholder.component.html',
  styleUrls: ['./loading-placeholder.component.scss'],
})
export class LoadingPlaceholderComponent implements OnInit, OnChanges {
  @Input() title = 'Verificăm datele în portalul PAID…';

  ngOnChanges(changes: SimpleChanges): void {
    // == null to also match undefined
    if (this.title == null) {
      this.title = 'Verificăm datele în portalul PAID…';
    }
  }

  constructor() {}

  ngOnInit() {}
}
