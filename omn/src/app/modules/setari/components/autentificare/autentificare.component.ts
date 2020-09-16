import { SettingsService } from './../../services/settings.service';
import { Component, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { unsubscriberHelper } from 'src/app/core/helpers/unsubscriber.helper';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { SubPageHeader } from 'src/app/shared/models/component/sub-page-header';

@Component({
  selector: 'app-autentificare',
  templateUrl: './autentificare.component.html',
  styleUrls: ['./autentificare.component.scss'],
})
export class AutentificareComponent implements OnInit, OnDestroy {
  @HostBinding('class') color = 'ion-color-white-page';
  headerConfig: SubPageHeader = {
    ...subPageHeaderDefault('Autentificare'),
    trailingIcon: null,
  };

  formGroup = this.fb.group({
    faceId: this.fb.control(false),
  });
  faceIdS: Subscription;

  constructor(private fb: FormBuilder, private settingsS: SettingsService) {
    this.getFaceIdstatus();
  }
  ngOnInit() {
    this.handleSubmission();
  }

  // Try to attach this after data loading for the toggles.
  handleSubmission() {
    this.faceIdS = this.formGroup
      .get('faceId')
      .valueChanges.subscribe((v: boolean) => {
        this.settingsS.toggleFaceId(v);
      });
  }

  getFaceIdstatus() {
    this.settingsS.getFaceIdState().subscribe((data: boolean) => {
      this.formGroup.get('faceId').patchValue(data);
    });
  }

  ngOnDestroy() {
    unsubscriberHelper(this.faceIdS);
  }
}
