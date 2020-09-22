import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';

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
  safeUrl;
  @Input() data: any
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.data.url
    );
  }

  ifunc() {
    console.log(document.getElementById("iframe").contentWindow.location.href)
  }

  closeModal() {
    this.cancelSubject.next(true);
  }

}
