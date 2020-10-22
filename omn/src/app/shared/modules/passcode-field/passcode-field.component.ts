import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonInput } from '@ionic/angular';

@Component( {
  selector: 'app-passcode-field',
  templateUrl: './passcode-field.component.html',
  styleUrls: [ './passcode-field.component.scss' ],
} )
export class PasscodeFieldComponent implements OnInit, AfterViewInit {
  @ViewChild( 'inputField', { static: true } ) inputField: IonInput;
  digitsLength = 0;
  @Input() errorLogin: string | null | boolean;
  @Input() busy: boolean;
  passForm: FormGroup;
  @Output() doPassForm: EventEmitter<FormGroup> = new EventEmitter();
  @Output() doClearErr: EventEmitter<any> = new EventEmitter();
  @Output() doDigitLength: EventEmitter<number> = new EventEmitter();
  savePin = [];
  constructor( private formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.initForm();
  }

  clickInput() {
    this.inputField.setFocus();
  }

  ngAfterViewInit() {
    /* setTimeout(() => {
      this.clickInput();
    }, 200); */
  }

  initForm() {
    this.passForm = this.formBuilder.group( {
      passcode: [
        '',
        [ Validators.required, Validators.minLength( 6 ), Validators.maxLength( 6 ) ],
      ],
    } );

    this.passForm.valueChanges.subscribe( ( value ) => {
      this.changeInput( value.passcode );
    } );
  }

  changeInput( passCode: string ) {
    this.digitsLength = passCode ? passCode.length : 0;
    this.emitDigitLength();
    /*  clear savePin*/
    if ( passCode === null && this.savePin.length > 5 ) {
      this.doResetForSavePin();
    }
    /*  */
    if ( this.digitsLength === 6 && !this.busy ) {
      this.emitForm();
    }
    if ( this.digitsLength > 6 ) {
      const value = this.passCode.value ? this.passCode.value : '';
      try {
        this.passCode.setValue( value.substring( 0, 6 ), { emitEvent: false } );
      } catch ( e ) { }
    }
    this.clearErr();
  }

  get passCode() {
    return this.passForm.get( 'passcode' );
  }
  public emitForm(): void {
    this.doPassForm.emit( this.passForm );
  }

  public emitDigitLength(): void {
    this.doDigitLength.emit( this.digitsLength > 6 ? 6 : this.digitsLength );
  }

  clearErr() {
    if ( this.errorLogin != null || typeof this.errorLogin != null ) {
      this.doClearErr.emit( null );
    }
  }

  clickingInput( pinKey: any ) {
    switch ( pinKey ) {
      case 'backIcon':
        if ( this.savePin.length > 0 ) {
          this.savePin.pop();
        }
        break;
      default:
        this.savePin.push( pinKey );
        break;
    }
    this.digitsLength = this.savePin.length;
    if ( this.digitsLength === 6 ) {
      this.passCode.setValue( this.savePin.join( '' ) );
    }
  }
  doResetForSavePin() {
    this.savePin = [];
    this.digitsLength = 0;
  }
}
