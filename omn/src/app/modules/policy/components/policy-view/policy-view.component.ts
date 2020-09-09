import { dateHelperDMY } from 'src/app/core/helpers/date.helper';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { get } from 'lodash';
import { PolicyItem } from 'src/app/shared/models/data/policy-item';
import { CalendarEntry } from '../models/calendar-entry';
import { subPageHeaderCustom } from './../../../../shared/data/sub-page-header-custom';
import { PolicyDataService } from './../../services/policy-data.service';
@Component({
  selector: 'app-policy-view',
  templateUrl: './policy-view.component.html',
  styleUrls: ['./policy-view.component.scss'],
})
export class PolicyViewComponent implements OnInit {
  headerConfig = subPageHeaderCustom('Polița PAD', 'bg-state');
  isAmplus = false;
  calEntry: CalendarEntry;
  constructor(
    private route: ActivatedRoute,
    private policyDataService: PolicyDataService,
    private navCtrl: NavController
  ) {
    this.route.params.subscribe((params: any) => {
      this.getPolicyById(params.id);
    });
  }

  ngOnInit(): void {}

  getPolicyById(id) {
    this.policyDataService.getSinglePolicyById(id).subscribe((policy) => {
      if (policy) {
        this.setCalEntry(policy);
      } else {
        this.navCtrl.navigateBack('policy');
      }
    });
  }

  setCalEntry(policy: PolicyItem) {
    const date = get(policy, 'dates.to', null);
    let processedDate;
    try {
      processedDate = Date.parse(date);
      this.calEntry = {
        title: 'Expirare polita ' + get(policy, 'name', ''),
        location: 'Romania',
        notes:
          'Polita ' + policy.id + ' expira la ' + dateHelperDMY(processedDate),
        startDate: this.policyDataService.getEightDayBeforeExpiryDate(
          processedDate
        ),
        endDate: new Date(processedDate),
        options: {
          firstReminderMinutes: 15,
          calendarName: 'policy',
        },
      };
    } catch (e) {}
  }

  addCalendarEntry() {
    this.policyDataService.addExpiryCalendarEntry(this.calEntry);
  }
}
