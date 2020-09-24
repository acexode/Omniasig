import { RequestService } from './../../../../core/services/request/request.service';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'omnpo-payment-pay-modal',
  templateUrl: './payment-pay-modal.component.html',
  styleUrls: ['./payment-pay-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentPayModalComponent implements OnInit {
  @ViewChild('iframeRef', { static: false }) iframeRef: ElementRef;
  modalForm: FormGroup;
  cancelSubject: Subject<boolean> = new Subject();
  submitSubject: Subject<boolean> = new Subject();
  iframeUrl: string;
  safeUrl:SafeResourceUrl;
  @Input() data: any
  constructor(private sanitizer: DomSanitizer,private iab: InAppBrowser) { }

  ngOnInit(): void {
    this.iframeUrl = this.sanitizer.sanitize(4, 'test.3dsecure.gpwebpay.com/pgw/card?pgwSessionId=X0JQc8QgfPzso2CHXnj4jwLRiq2XqkMK');
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'test.3dsecure.gpwebpay.com/pgw/card?pgwSessionId=X0JQc8QgfPzso2CHXnj4jwLRiq2XqkMK'
    );
  }

  closeModal() {
    this.cancelSubject.next(true);
  }

}
