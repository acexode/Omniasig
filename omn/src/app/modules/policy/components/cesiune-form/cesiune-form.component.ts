import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import { IonInputConfig } from '../../../../shared/models/component/ion-input-config';
import { unsubscriberHelper } from './../../../../core/helpers/unsubscriber.helper';
import { inputConfigHelper } from './../../../../shared/data/input-config-helper';
import { radiosConfigHelper } from './../../../../shared/data/radios-config-helper';
import { IonRadioInputOption } from './../../../../shared/models/component/ion-radio-input-option';
import { IonRadiosConfig } from './../../../../shared/models/component/ion-radios-config';
import { CesiuneItem } from './../models/cesiune-item';

@Component({
  selector: 'app-cesiune-form',
  templateUrl: './cesiune-form.component.html',
  styleUrls: ['./cesiune-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CesiuneFormComponent implements OnInit {
  @Input() config: IonInputConfig;
  @Input() cesiuneData = null;

  enableCesiune = false;
  cesuineItems: CesiuneItem[];

  radiosConfig: IonRadiosConfig = radiosConfigHelper({
    label: 'Locuința e ipotecată?',
    mode: 'item',
  });

  radioOptions: Array<IonRadioInputOption> = [
    { label: 'Da', id: 1 },
    { label: 'Nu', id: 0 },
  ];

  cuiConfig: IonInputConfig = inputConfigHelper({
    label: 'CUI bancă',
    type: 'text',
    placeholder: 'Completează',
  });
  denumireBancaConfig: IonInputConfig = inputConfigHelper({
    label: 'Denumire bancă',
    type: 'text',
    placeholder: 'Completează',
  });

  procentConfig: IonInputConfig = inputConfigHelper({
    label: 'Procent',
    type: 'number',
    placeholder: 'Completează',
  });

  numarCesionariConfig: IonInputConfig = inputConfigHelper({
    label: 'Câte bănci dețin ipoteca?',
    type: 'number',
    placeholder: 'Completează',
  });

  hasCesiuneS;
  cesiuneNumS;
  formValidS;

  @Output() emitForm: EventEmitter<any> = new EventEmitter();
  public cesiuneForm: FormGroup;
  censionar: FormArray;

  constructor(private fb: FormBuilder, private cdRef: ChangeDetectorRef) {
    this.radiosConfig.itemClasses = 'w-50 inline-flex';
    this.radiosConfig.inputLabel.classes = 'mb-16';
    this.numarCesionariConfig.max = 2;
    this.numarCesionariConfig.min = 1;
    this.numarCesionariConfig.maxLength = 1;
    this.numarCesionariConfig.spinnerConfig = {
      step: 1,
    };
    this.procentConfig.min = 1;
    this.procentConfig.max = 100;
    this.procentConfig.maxLength = 5;
  }

  ngOnInit() {
    this.cesiuneForm = this.fb.group({
      hasCesiune: this.fb.control(null, Validators.required),
      cesiuneNum: this.fb.control(null),
      cesionar: this.fb.array([]),
    });
    this.handleFormEvents();
    if (this.cesiuneData) {
      this.cesiuneForm.setValue(this.cesiuneData);
    }
    this.cesiuneForm.updateValueAndValidity();
    this.cdRef.markForCheck();
  }

  handleFormEvents() {
    unsubscriberHelper(this.cesiuneNumS);
    unsubscriberHelper(this.hasCesiuneS);
    unsubscriberHelper(this.formValidS);

    if (this.hasCesiune instanceof AbstractControl) {
      this.hasCesiuneS = this.hasCesiune.valueChanges.subscribe((val) => {
        this.enableCesiune = val === 1;
        if (!val) {
          this.cesiuneNumS = 0;
          this.cesiuneNum.clearValidators();
          this.cesiuneNum.reset();
        } else {
          // this.cesiuneNum.setValue(1);
          this.cesiuneNum.setValidators([
            Validators.required,
            Validators.min(1),
            Validators.max(2),
          ]);
        }
        this.cesiuneNum.updateValueAndValidity({ emitEvent: true });
      });
    }

    if (this.cesiuneNum instanceof AbstractControl) {
      this.cesiuneNumS = this.cesiuneNum.valueChanges
        .pipe(distinctUntilChanged())
        .subscribe((val) => {
          if (this.cesiuneNum.valid) {
            this.handleCesionarItems(val);
          }
        });
      this.cesiuneForm.updateValueAndValidity({ emitEvent: true });
    }

    this.formValidS = this.cesiuneForm.statusChanges
      .pipe(distinctUntilChanged())
      .subscribe((v) => {
        this.cdRef.markForCheck();
      });
  }

  // Increase / decrease items.
  handleCesionarItems(amount) {
    if (amount > this.cesionar.length) {
      while (this.cesionar.length < amount) {
        this.cesionar.push(this.createItem());
      }
    } else if (amount < this.cesionar.length) {
      while (this.cesionar.length > amount) {
        this.cesionar.removeAt(this.cesionar.length - 1);
      }
    }
  }

  // This will build a new Cesionar form item.
  createItem(): FormGroup {
    return this.fb.group({
      cui: this.fb.control(null, Validators.required),
      procent: this.fb.control(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(100),
      ]),
      denumireCesionar: this.fb.control('', Validators.required),
    });
  }

  get hasCesiune() {
    return this.cesiuneForm.get('hasCesiune');
  }

  get cesiuneNum() {
    return this.cesiuneForm.get('cesiuneNum');
  }

  get cesionar(): FormArray {
    const def = this.fb.array([]);
    const ff = this.cesiuneForm.get('cesionar');
    return (ff ? ff : def) as FormArray;
  }

  onSubmit() {
    if (this.cesiuneForm.valid) {
      this.emitForm.emit(this.cesiuneForm.value);
    } else {
      this.cesiuneForm.updateValueAndValidity();
      this.cdRef.markForCheck();
    }
  }
}
