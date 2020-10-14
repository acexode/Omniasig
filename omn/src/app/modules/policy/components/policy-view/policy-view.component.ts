import { PadService } from './../../services/pad.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isPlatform, NavController } from '@ionic/angular';
import { get } from 'lodash';
import { dateHelperDMY } from 'src/app/core/helpers/date.helper';
import { CustomStorageService } from 'src/app/core/services/custom-storage/custom-storage.service';
import { PolicyItem } from 'src/app/shared/models/data/policy-item';
import { CalendarEntry } from '../models/calendar-entry';
import { subPageHeaderCustom } from './../../../../shared/data/sub-page-header-custom';
import { PolicyDataService } from './../../services/policy-data.service';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
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
    private file: File,
    private storeS: CustomStorageService,
    private fileOpener: FileOpener,
    private padService: PadService
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
    this.storeS.getItem(title).subscribe((fileObj) => {
      if (fileObj) {
        this.prepareDoc(title);
      } else {
        this.downloading = true;
        const id = this.policy.padPolicyDocumentId;
        this.padService.getPadPolicyDocument(id)
          .subscribe((offerDocument) => {
            if (offerDocument) {
              this.storeS.setItem(title, offerDocument).subscribe((_) => {
                this.prepareDoc(title);
              });
            }
            this.downloading = false;
          });
      }
    });
  }

  /**
   *
   * @param docTitle  title you want to name the doc when the user saves it;
   * Also Note that a title should always end with the file extenstion type. (e.g) 'title.pdf'
   */
  prepareDoc(docTitle: string) {
    // TODO converts base64 to blob data so it can be read: this algorithms makes data processing easy... as the conversion is graudal
    this.storeS.getItem(docTitle).subscribe((fileObj: any) => {
      const blobPdfFromBase64String = () => {
        const byteArray = Uint8Array.from(
          atob(fileObj.file)
            .split('')
            .map((char) => char.charCodeAt(0))
        );
        return new Blob([byteArray], { type: 'application/pdf' });
      };
      this.openFile(blobPdfFromBase64String(), docTitle);
    });
  }

  openFile(blob: Blob, docTitle: string) {
    //  Determine a native file path to save to
    let filePath: any;
    if (isPlatform('android')) {
      filePath = this.file.externalDataDirectory;
    }
    if (isPlatform('ios')) {
      filePath = this.file.documentsDirectory;
    } else {
      filePath = this.file.dataDirectory;
    }
    this.file
      .writeFile(filePath, docTitle, blob, { replace: true })
      .then((fileEntry: FileEntry) => {
          this.fileOpener.showOpenWithDialog(fileEntry.toURL(), 'application/pdf')
            .then(() => {
            // TODO nothing should be done here
          })
            .catch(e => {
            // TODO: error handling maybe needed here...
          });
      })
      .catch((err) => {
        // TODO: error handling may be needed here too...
      });
  }
}
