import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CustomRouterService } from 'src/app/core/services/custom-router/custom-router.service';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { Locuinte } from 'src/app/shared/models/data/locuinte.interface';
import { LocuinteService } from '../../services/locuinte/locuinte.service';

@Component({
  selector: 'app-locuinte-view',
  templateUrl: './locuinte-view.component.html',
  styleUrls: ['./locuinte-view.component.scss'],
})
export class LocuinteViewComponent implements OnInit {
  headerConfig = subPageHeaderDefault('Locuințe');
  locuinta$: BehaviorSubject<Locuinte> = new BehaviorSubject(null);
  variant = 'not-insured'; // not-insured, not-found, found.
  @HostBinding('class') color = 'ion-color-white-page';
  constructor(
    private routerS: CustomRouterService,
    private aRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private navCtrl: NavController,
    private locuinteS: LocuinteService
  ) {}

  ngOnInit() {
    this.routerS
      .getNavigationEndEvent()
      .pipe(
        switchMap(() => this.routerS.processChildParamsAsync(this.aRoute, 'id'))
      )
      .subscribe((id: any) => {
        if (id) {
          this.locuinteS.getSingleLocuinta(id).subscribe((val: Locuinte) => {
            if (val) {
              this.locuinta$.next(val);
              this.cdRef.markForCheck();
            } else {
              this.navCtrl.navigateRoot(['/profil', 'locuinte']);
            }
          });
        } else {
          this.navCtrl.navigateRoot(['/profil', 'locuinte']);
        }
      });
  }

  demoType() {
    switch (this.variant) {
      case 'not-insured':
        this.variant = 'not-found';
        break;
      case 'not-found':
        this.variant = 'found';
        break;
      case 'found':
      default:
        this.variant = 'not-insured';
        break;
    }
  }
}
