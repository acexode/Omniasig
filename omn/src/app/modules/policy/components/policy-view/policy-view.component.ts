import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { get } from 'lodash';
import { dateHelperDMY } from 'src/app/core/helpers/date.helper';
import { PolicyItem } from 'src/app/shared/models/data/policy-item';
import { SharedFileService } from 'src/app/shared/modules/shared-file/services/shared-file.service';
import { CalendarEntry } from '../models/calendar-entry';
import { subPageHeaderCustom } from './../../../../shared/data/sub-page-header-custom';
import { PadService } from './../../services/pad.service';
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
  policy: PolicyItem;
  downloading = false;

  constructor(
    private route: ActivatedRoute,
    private policyDataService: PolicyDataService,
    private navCtrl: NavController,
    private padService: PadService,
    private modalController: ModalController,
    private fileS: SharedFileService
  ) {
    this.route.params.subscribe((params: any) => {
      this.getPolicyById(params.id);
    });
  }

  ngOnInit(): void {}

  getPolicyById(id) {
    this.policyDataService
      .getSinglePolicyById(id)
      .subscribe((policy: PolicyItem) => {
        if (policy) {
          this.policy = policy;
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

  downloadPolicy() {
    // TODO checked if doc has been downloaded earlier or fetch do from WS...
    const title = `policy-${this.policy.padPolicyDocumentId}.pdf`;
    const id = this.policy.padPolicyDocumentId;
    if (id === 0) {
      return this.presentModal(
        'Documentul nu este disponibil',
        'Documentul este in curs de pregatire. Reincercati mai tarziu.'
      );
    } else {
      this.downloading = true;
      this.fileS
        .downloadAndOpenFile({
          fileName: title,
          storeKey: title,
          downloadService: this.padService.getPadPolicyDocument(id),
          fileFormat: 'application/pdf',
        })
        .subscribe(
          (v) => {
            this.downloading = false;
          },
          (err) => {
            Promise.resolve(
              this.presentModal(
                'Nu am putut descarca fisierul',
                err ? get(err, 'error', '') : ''
              )
            );
            this.downloading = false;
          }
        );
    }
  }

  async presentModal(title, description) {
    const modal = await this.fileS.createErrorModal(title, description);
    return await modal.present();
  }
}