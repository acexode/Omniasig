import { unsubscriberHelper } from './../../../../../core/helpers/unsubscriber.helper';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { LocuinteFormType } from 'src/app/shared/models/modes/locuinte-form-modes';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-locuinte-form',
  templateUrl: './locuinte-form.component.html',
  styleUrls: ['./locuinte-form.component.scss'],
})
export class LocuinteFormComponent implements OnInit {
  private fG: FormGroup;
  formTypes = LocuinteFormType;
  padSubs;

  @Input() formType: LocuinteFormType = null;
  @Input() buttonVisible = true;
  @Input() buttonText = 'Continuă';
  @Input() formSubmitting = false;
  @Input() fieldConfig: { [key: string]: any } = {};
  @Input() fieldConfigData: { [key: string]: any } = {};
  @Output() customEvents: EventEmitter<any> = new EventEmitter();
  @Output() openModal: EventEmitter<any> = new EventEmitter();
  @Input() set formGroupInstance(fg: FormGroup) {
    this.fG = fg;
    this.handleCustom();
    this.cdRef.markForCheck();
  }
  get formGroupInstance() {
    return this.fG;
  }

  // Only used for custom policy displays.
  @Input() policyType = null;
  @Output() eventSubmit: EventEmitter<any> = new EventEmitter();
  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {}

  doSubmit() {
    if (this.fG.valid) {
      this.eventSubmit.emit(true);
    } else {
      this.fG.updateValueAndValidity();
      this.cdRef.markForCheck();
    }
  }
  emitEvents() {
    this.customEvents.emit();
  }

  handleCustom() {
    if (this.fG) {
      const fieldC = this.fG.get('padAvailable');
      const fieldS = this.fG.get('padSerie');
      const fieldN = this.fG.get('padNr');
      if (fieldC) {
        unsubscriberHelper(this.padSubs);
        this.padSubs = fieldC.valueChanges
          .pipe(distinctUntilChanged())
          .subscribe((fV) => {
            if (fV) {
              if (fieldN) {
                fieldN.setValidators([Validators.required]);
              }
              if (fieldS) {
                fieldS.setValidators([Validators.required]);
              }
            } else {
              if (fieldN) {
                fieldN.clearValidators();
                fieldN.reset();
              }
              if (fieldS) {
                fieldS.clearValidators();
                fieldS.reset();
              }
            }
            if (fieldN) {
              fieldN.updateValueAndValidity();
            }
            if (fieldS) {
              fieldS.updateValueAndValidity();
            }
            this.cdRef.markForCheck();
          });
      }
    }
  }

  get padAvailableV() {
    if (this.fG) {
      const fieldC = this.fG.get('padAvailable');
      return fieldC ? fieldC.value : false;
    }
    return false;
  }

  triggerModal(modalName) {
    this.openModal.emit(modalName);
  }
}
