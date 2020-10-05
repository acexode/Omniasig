import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-passcode-field',
  templateUrl: './passcode-field.component.html',
  styleUrls: ['./passcode-field.component.scss'],
})
export class PasscodeFieldComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('inputField') inputField: IonInput;
  digitsLength = 0;
  @Input() errorLogin: string | null | boolean;
  @Input() busy: boolean;
  passForm: FormGroup;
  @Output() doPassForm: EventEmitter<FormGroup> = new EventEmitter();
  @Output() doClearErr: EventEmitter<any> = new EventEmitter();
  @Output() doDigitLength: EventEmitter<number> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  clickInput() {
    this.inputField.setFocus();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.clickInput();
    }, 200);
  }

  initForm() {
    this.passForm = this.formBuilder.group({
      passcode: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
    });

    this.passForm.valueChanges.subscribe((value) => {
      this.changeInput(value.passcode);
    });
  }

  changeInput(passCode: string) {
    this.digitsLength = passCode ? passCode.length : 0;
    this.emitDigitLength();
    if (this.digitsLength === 6 && !this.busy) {
      this.emitForm();
    }
    this.clearErr();
  }

  public emitForm(): void {
    this.doPassForm.emit(this.passForm);
  }

  public emitDigitLength(): void {
    this.doDigitLength.emit(this.digitsLength);
  }

  clearErr() {
    if (this.errorLogin != null || typeof this.errorLogin != null) {
      this.doClearErr.emit(null);
    }
  }
  ngOnDestroy(): void {
    if (this.inputField) {
      this.inputField.getInputElement().then((iE) => {
        if (iE) {
          try {
            iE.blur();
          } catch (err) {
            // do nothing.
          }
        }
      });
    }
  }
}
