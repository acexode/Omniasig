import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonTextItem } from './../../models/component/ion-text-item';

@Component({
  selector: 'app-general-error',
  templateUrl: './general-error.component.html',
  styleUrls: ['./general-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralErrorComponent implements OnInit {
  @Input() title = 'Ne pare rău...';
  @Input() texts: Array<IonTextItem> = [
    {
      classes: 'ion-text-center',
      text:
        'Ceva nu a funcționat corect. Vei fi redirecționat spre pagina de pornire.',
    },
  ];
  @Input() routeRedirect = '/home';
  @Input() doNavigate = true;

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
}