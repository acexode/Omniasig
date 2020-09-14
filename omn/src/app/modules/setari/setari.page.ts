import { SettingsService } from './services/settings.service';
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
  constructor(private fb: FormBuilder, private settingsS: SettingsService) { }
  notificationS: Subscription;

  ngOnInit() {
    this.handleSubmission();
    this.getSettings()
  }

  getSettings() {
    this.settingsS.settings$.subscribe(
      data => {
        this.formGroup.get('notifications').patchValue(data.notifications)
      }
    )
  }

  // Try to attach this after data loading for the toggles.
  handleSubmission() {
    this.notificationS = this.formGroup
      .get('notifications')
      .valueChanges.subscribe((v: boolean) => {
        this.saveSettings(v)
      });
  }

  saveSettings(v: boolean) {
    this.settingsS.updateSettings({ notifications: v })
  }

  ngOnDestroy() {
    unsubscriberHelper(this.notificationS);
  }
}
