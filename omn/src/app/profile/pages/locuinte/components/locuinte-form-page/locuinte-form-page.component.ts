import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CustomRouterService } from 'src/app/core/services/custom-router/custom-router.service';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { Locuinte } from 'src/app/shared/models/data/locuinte';
import { LocuinteFormModes } from 'src/app/shared/models/modes/locuinte-form-modes';

@Component({
  selector: 'app-locuinte-form-page',
  templateUrl: './locuinte-form-page.component.html',
  styleUrls: ['./locuinte-form-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocuinteFormPageComponent implements OnInit {
  headerConfig = null;
  dataModel: Locuinte;
  formMode: LocuinteFormModes;
  formModes = LocuinteFormModes;

  constructor(
    private routerS: CustomRouterService,
    private aRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.routerS
      .getNavigationEndEvent()
      .pipe(
        switchMap(() => {
          return this.routerS.processChildDataAsync(this.aRoute, 'formMode');
        })
      )
      .subscribe((fM) => {
        this.formMode = fM;
        this.setTitles();
        this.cdRef.markForCheck();
      });
  }

  setTitles() {
    if (this.formMode === this.formModes.ADD_NEW_FULL) {
      this.headerConfig = subPageHeaderDefault('Adresa');
    }
    if (this.formMode === this.formModes.EDIT_FULL) {
      this.headerConfig = subPageHeaderDefault('Adresa');
    }
  }
}
