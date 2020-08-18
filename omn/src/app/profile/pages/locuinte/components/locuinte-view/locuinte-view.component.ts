import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CustomRouterService } from 'src/app/core/services/custom-router/custom-router.service';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import {
  Locuinte,
  LocuintaState,
} from 'src/app/shared/models/data/locuinte.interface';
import { LocuinteService } from '../../services/locuinte/locuinte.service';
import { LocuinteFormType } from 'src/app/shared/models/modes/locuinte-form-modes';

@Component({
  selector: 'app-locuinte-view',
  templateUrl: './locuinte-view.component.html',
  styleUrls: ['./locuinte-view.component.scss'],
})
export class LocuinteViewComponent implements OnInit {
  headerConfig = null;
  locuinta$: BehaviorSubject<Locuinte> = new BehaviorSubject(null);
  variant = 'not-insured'; // not-insured, not-found, found.
  formMode: LocuintaState;
  locuintaState = LocuintaState;
  formType: LocuinteFormType.ADDRESS;
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
        switchMap(() =>
          combineLatest([
            this.routerS.processChildDataAsync(this.aRoute, 'formMode'),
            this.routerS.processChildParamsAsync(this.aRoute, 'id'),
          ])
        )
      )
      .subscribe((vals: any) => {
        this.formMode = vals[0];
        this.setTitles();
        const id = vals[1];
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

  setTitles() {
    switch (this.formMode) {
      case this.locuintaState.INCOMPLETE:
        this.headerConfig = subPageHeaderDefault('Adresa');
        break;
      // case this.formModes.EDIT_FULL:
      //   this.headerConfig = subPageHeaderDefault('Adresa');
      //   break;
      default:
        this.headerConfig = subPageHeaderDefault('Locuințe');
        break;
    }
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

  formCustomEvents() {}

  handleFormSubmit() {}
}
