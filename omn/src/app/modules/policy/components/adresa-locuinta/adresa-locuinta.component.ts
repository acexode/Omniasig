import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { get } from 'lodash';
import { PolicyLocuintaListItem } from './../../../../shared/models/component/policy-locuinta-list-item';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PaidExternalService } from '../../services/paid-external-service.service';

@Component({
  selector: 'app-adresa-locuinta',
  templateUrl: './adresa-locuinta.component.html',
  styleUrls: ['./adresa-locuinta.component.scss'],
})
export class AdresaLocuintaComponent implements OnInit {
  vLocuinteList: Array<PolicyLocuintaListItem> = [];
  vLocuinteListP: Array<PolicyLocuintaListItem> = [];
  fullList: Array<PolicyLocuintaListItem> = [];
  addNew = 'ADD_NEW';
  checkPAD: boolean = false;
  userId;
  loaderTitle = 'Verificăm datele în portalul PAID…';

  @Input() set locuinteList(lV) {
    this.fullList = lV;
    // Split based on policy availability.
    this.vLocuinteList = lV.filter((vv) => !vv.policy).map((v) => v);
    this.vLocuinteListP = lV.filter((vv) => vv.policy).map((v) => v);
    this.initLocuintaMainForm();
    this.cdRef.markForCheck();
  }

  @Input() policyID: string;

  @Output() selectionDone: EventEmitter<
    string | PolicyLocuintaListItem
  > = new EventEmitter();

  @Input() initialData: PolicyLocuintaListItem = null;
  locuintaForm = this.fb.group({
    selection: this.fb.control('', Validators.required),
  });
  @Output() checkPadResponse: EventEmitter<any> = new EventEmitter();
  @Output() changeTitleEvent: EventEmitter<any> = new EventEmitter();
  constructor(
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private authS: AuthService,
    private paidS: PaidExternalService
  ) {}

  ngOnInit() {
    this.authS.getAuthState().subscribe((authData) => {
      this.userId = authData.account.userId;
    });

    this.initLocuintaMainForm();
  }

  submitForm() {
    if (this.locuintaForm.valid) {
      const controlS = this.locuintaForm.get('selection');
      if (controlS) {
        const value = controlS.value;
        if (value !== 'ADD_NEW') {
          this.emitLocuintaItemById(value);
        } else {
          this.selectionDone.emit(value);
        }
      }
    }
  }

  emitLocuintaItemById(id) {
    this.changeTitleEvent.emit();
    this.checkPAD = true;
    const value = this.fullList.find((lI) => get(lI, 'locuinta.id', -1) === id);
    if (value) {
      this.paidS
        .CheckPAD({ locationId: value.locuinta.id, userId: this.userId })
        .subscribe(
          (value2) => {
            if (this.policyID === 'AMPLUS') {
              if (value2.canHaveAmplus) {
                this.selectionDone.emit(value);
              } else {
                this.checkPadResponse.emit(value2);
              }
              return;
            }
            //TODO: check for AMPLUS+ PAD
            // To be removed: this allows smooth flow for AMPLUS+ PAD workflow
            this.selectionDone.emit(value);
          },
          (error) => {
            this.checkPadResponse.emit(error);
          }
        );
    }
  }
  get selection() {
    return this.locuintaForm.get('selection');
  }

  initLocuintaMainForm() {
    if (this.initialData && this.initialData.locuinta) {
      if (this.selection) {
        this.selection.setValue(this.initialData.locuinta.id);
        this.selection.updateValueAndValidity();
      }
      this.cdRef.markForCheck();
    }
  }
}
