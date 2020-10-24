import { unsubscriberHelper } from './../../../../../core/helpers/unsubscriber.helper';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
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
  amount;
  area;
  floors;
  rooms;
  @Input() toggleStreetInput = null;
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
    this.setValidatorSubs();
    this.cdRef.markForCheck();
  }
  get formGroupInstance() {
    return this.fG;
  }

  validatorSubs;
  // Only used for custom policy displays.
  @Input() policyType = null;
  @Output() eventSubmit: EventEmitter<any> = new EventEmitter();
  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {}

  setValidatorSubs() {
    unsubscriberHelper(this.validatorSubs);
    if (this.fG instanceof AbstractControl) {
      this.validatorSubs = this.fG.statusChanges
        .pipe(distinctUntilChanged())
        .subscribe((st) => {
          this.cdRef.markForCheck();
        });
    }
  }

  updateValidity(){
    if (this.formType === 1) {
      this.formGroupInstance.get('value').statusChanges.subscribe(newStatus => {
        this.amount = newStatus;
      });
      this.formGroupInstance.get('area').statusChanges.subscribe(newStatus => {
        this.area = newStatus;
      });
      this.formGroupInstance.get('rooms').statusChanges.subscribe(newStatus => {
        this.rooms = newStatus;
      });
      this.formGroupInstance.get('floors').statusChanges.subscribe(newStatus => {
        this.floors = newStatus;
      });
    }
  }

  doSubmit() {
    // Angular considers disabled as invalid, tweak this if any issues.
    // Make sure the template button is also working.
    if (this.fG.valid || this.fG.disabled) {
      this.eventSubmit.emit(true);
    } else {
      this.fG.updateValueAndValidity();
      this.cdRef.markForCheck();
    }
  }

  emitEvents() {
    this.customEvents.emit();
  }

  triggerModal(modalName) {
    this.openModal.emit(modalName);
  }
}
