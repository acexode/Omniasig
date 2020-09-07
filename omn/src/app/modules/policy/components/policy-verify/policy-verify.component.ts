import { get } from 'lodash';
import { PolicyDataService } from './../../services/policy-data.service';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { PolicyOffer } from 'src/app/shared/models/data/policy-offer';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-policy-verify',
  templateUrl: './policy-verify.component.html',
  styleUrls: ['./policy-verify.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyVerifyComponent implements OnInit {
  policyID;
  @Input() offerData: PolicyOffer;
  @Output() calculateEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private policyS: PolicyDataService,
    private navCtrl: NavController,
    private aRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.policyID = this.aRoute.snapshot.queryParamMap.get('policyID');
  }
  addOffer() {
    this.policyS.addOffer(this.offerData).subscribe((v) => {
      if (v) {
        const id = get(v, 'id', null);
        if (id) {
          this.navCtrl.navigateForward(['/policy', 'offer', id]);
        } else {
          this.navCtrl.navigateRoot(['/policy']);
        }
      } else {
        // We'll probably only show an error in here.
      }
    });
  }

  calculatePrice() {
    this.calculateEvent.emit();
  }
}
