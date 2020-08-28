import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { SubPageHeader } from 'src/app/shared/models/component/sub-page-header';
import { unsubscriberHelper } from './../../core/helpers/unsubscriber.helper';

@Component({
  selector: 'app-setari',
  templateUrl: './setari.page.html',
  styleUrls: ['./setari.page.scss'],
})
export class SetariPage implements OnInit, OnDestroy {
  @HostBinding('class') color = 'ion-color-white-page';
  headerConfig: SubPageHeader = {
    ...subPageHeaderDefault('Setări'),
  };

  formGroup = this.fb.group({
    notifications: this.fb.control(false),
  });
  constructor(private fb: FormBuilder) {}
  notificationS: Subscription;

  ngOnInit() {
    this.handleSubmission();
  }

  // Try to attach this after data loading for the toggles.
  handleSubmission() {
    unsubscriberHelper(this.notificationS);
    this.notificationS = this.formGroup
      .get('notifications')
      .valueChanges.subscribe((v) => {
        // TODO: implement data push.
      });
  }

  ngOnDestroy() {
    unsubscriberHelper(this.notificationS);
  }
}
