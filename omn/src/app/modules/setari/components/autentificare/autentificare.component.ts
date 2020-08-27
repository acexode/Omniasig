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

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.handleSubmission();
  }

  // Try to attach this after data loading for the toggles.
  handleSubmission() {
    unsubscriberHelper(this.faceIdS);
    this.faceIdS = this.formGroup.get('faceId').valueChanges.subscribe((v) => {
      // TODO: implement data push.
    });
  }

  ngOnDestroy() {
    unsubscriberHelper(this.faceIdS);
  }
}
