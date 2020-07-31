import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocuinteFormType } from 'src/app/shared/models/modes/locuinte-form-modes';

@Component({
  selector: 'app-locuinte-form',
  templateUrl: './locuinte-form.component.html',
  styleUrls: ['./locuinte-form.component.scss'],
})
export class LocuinteFormComponent implements OnInit {
  private fG: FormGroup;
  formTypes = LocuinteFormType;

  @Input() formType: LocuinteFormType = null;
  @Input() fieldConfig: { [key: string]: any } = {};
  @Input() fieldConfigData: { [key: string]: any } = {};
  @Input() set formGroupInstance(fg: FormGroup) {
    this.fG = fg;
    this.cdRef.markForCheck();
  }
  get formGroupInstance() {
    return this.fG;
  }
  @Output() eventSubmit: EventEmitter<any> = new EventEmitter();
  constructor(private fb: FormBuilder, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {}

  doSubmit() {
    if (this.fG.valid) {
      this.eventSubmit.emit(true);
    }
  }
}
