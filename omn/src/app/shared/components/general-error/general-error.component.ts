import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonTextItem } from './../../models/component/ion-text-item';

@Component({
  selector: 'app-general-error',
  templateUrl: './general-error.component.html',
  styleUrls: ['./general-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralErrorComponent implements OnInit, OnChanges {
  @Input() title = {
    text: 'Ne pare rău...',
    class: '',
  };
  @Input() texts: Array<IonTextItem> = [
    {
      classes: 'ion-text-center',
      text:
        'Ceva nu a funcționat corect. Vei fi redirecționat spre pagina de pornire.',
    },
  ];
  @Input() buttonText = 'Înapoi';
  @Input() routeRedirect = '/home';
  @Input() doNavigate = true;
  @Output() goBack: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cdRef.markForCheck();
    const url = this.routeRedirect ? this.routeRedirect : '/home';
    setTimeout(() => {
      if (this.doNavigate) {
        this.router.navigateByUrl(url);
      }
    }, 3000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // == null to also match undefined
    if (this.title == null) {
      this.title = {
        text: 'Ne pare rău...',
        class: '',
      };
    }
  }

  back() {
    this.goBack.emit(true);
  }
}
