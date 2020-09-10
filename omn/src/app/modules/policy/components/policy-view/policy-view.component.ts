import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { get } from 'lodash';
import { dateHelperDMY } from 'src/app/core/helpers/date.helper';
import { PolicyItem } from 'src/app/shared/models/data/policy-item';
import { subPageHeaderCustom } from './../../../../shared/data/sub-page-header-custom';
import { PolicyDataService } from './../../services/policy-data.service';
import { Calendar } from '@ionic-native/calendar/ngx';
import { CalendarOptions, CalendarEntry } from '../models/calendar-entry';
@Component({
  selector: 'app-policy-view',
  templateUrl: './policy-view.component.html',
  styleUrls: ['./policy-view.component.scss'],
})
export class PolicyViewComponent implements OnInit {
  headerConfig = subPageHeaderCustom('Polița PAD', 'bg-state');
  isAmplus = false;

  date = '2020.09.30';

  calanderEntryOptions: CalendarOptions = {
    firstReminderMinutes: 15,
    calendarName: 'policy',
  };

  calEntry: CalendarEntry = {
    title: 'policy Expiry Date',
    location: 'Romania',
    notes: `Oferta 123456 expira ${this.date}`,
    startDate: this.policyDataService.getEightDayBeforeExpiryDate(this.date),
    endDate: new Date(this.date),
    options: this.calanderEntryOptions,
  };

  constructor(
    private route: ActivatedRoute,
    private policyDataService: PolicyDataService,
    private navCtrl: NavController,
    private calendar: Calendar
  ) {
    this.route.params.subscribe((params: any) => {
      this.getPolicyById(params.id);
    });
  }

  ngOnInit(): void {}

  getPolicyById(id) {
    this.policyDataService.getSinglePolicyById(id).subscribe((policy) => {
      if (policy) {
      } else {
        this.navCtrl.navigateBack('policy');
      }
    });
  }

  addCalenderEntry() {
    this.calendar
      .createEventWithOptions(
        this.calEntry.title,
        this.calEntry.location,
        this.calEntry.notes,
        this.calEntry.startDate,
        this.calEntry.endDate,
        this.calanderEntryOptions
      )
      .then(
        (msg) => {},
        (err) => {}
      );
  }
}
