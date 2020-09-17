import { IonInput } from '@ionic/angular';
import {
  Component,
  OnInit,
  ViewChild,
  Input,
  AfterViewChecked,
  EventEmitter,
  Output,
  AfterContentInit,
  AfterViewInit,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-passcode-field',
  templateUrl: './passcode-field.component.html',
  styleUrls: ['./passcode-field.component.scss'],
})
export class PasscodeFieldComponent implements OnInit, AfterViewInit {
  @ViewChild('inputField') inputField: IonInput;
  digitsLength = 0;
  @Input() errorLogin: string | null | boolean;
  @Input() busy: boolean;
  passForm: FormGroup;
  @Output() doPassForm: EventEmitter<FormGroup> = new EventEmitter();
  @Output() doClearErr: EventEmitter<any> = new EventEmitter();
  @Output() doDigitLength: EventEmitter<number> = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private platform: Platform) {}

  ngOnInit() {
    this.initForm();
  }

  clickInput() {
    this.inputField.getInputElement().then((input) => {
      input.click();
      input.focus();
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.clickInput();
    }, 650);
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
    // tslint:disable-next-line: triple-equals
    if (this.errorLogin != null || this.errorLogin != typeof null) {
      this.doClearErr.emit(null);
    }
  }
}
