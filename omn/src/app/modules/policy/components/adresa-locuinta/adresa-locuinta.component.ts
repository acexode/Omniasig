import { PolicyFormService } from './../../services/policy-form.service';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { get, set } from 'lodash';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PaidExternalService } from '../../services/paid-external-service.service';
import { PolicyLocuintaListItem } from './../../../../shared/models/component/policy-locuinta-list-item';

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
  checkPAD = false;
  userId;
  locuinteId;
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
  @Output() checkPadResponse: EventEmitter<any> = new EventEmitter();
  @Input() initialData: PolicyLocuintaListItem = null;
  locuintaForm = this.fb.group({
    selection: this.fb.control('', Validators.required),
  });
  @Output() changeTitleEvent: EventEmitter<any> = new EventEmitter();
  constructor(
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private authS: AuthService,
    private paidS: PaidExternalService,
    private policyFs: PolicyFormService,
    protected router: Router,
    private route: ActivatedRoute
  ) {
    this.authS.getAuthState().subscribe((authData) => {
      this.userId = authData.account.userId;
    });
  }

  ngOnInit() {
    console.log(this.vLocuinteList)
    this.route.queryParamMap
      .subscribe((params: any) => {
        this.locuinteId = params.params.id
        //this.locuinteId = this.vLocuinteList.filter(e => e.locuinta.id == id)[0].locuinta
        console.log(this.vLocuinteList)
      }
    );
    this.authS.getAuthState().subscribe((authData) => {
      this.userId = authData.account.userId;
    });

    this.initLocuintaMainForm();
    console.log(this.selection)
  }

  submitForm() {
    this.checkPAD = true;
    if (this.locuintaForm.valid) {
      const controlS = this.locuintaForm.get('selection');
      const value = controlS.value;
      if (value !== 'ADD_NEW') {
        this.emitLocuintaItemById(value);
      } else {
        this.selectionDone.emit(value);
      }
    }
  }

  emitLocuintaItemById(id) {
    this.changeTitleEvent.emit();
    this.checkPAD = true;
    const value = this.fullList.find((lI) => get(lI, 'locuinta.id', -1) === id);
    if (value) {
      const locuinta = get(value, 'locuinta', {});

      if (this.policyFs.checkEmptyLocuintaItems(locuinta)) {
        this.selectionDone.emit(value);
        return;
      }
      this.paidS
        .CheckPAD({ locationId: value.locuinta.id, userId: this.userId })
        .subscribe(
          (value2) => {
            const defPolicy = {
              dates: {
                to: null,
              },
            };
            if (this.policyID === 'AMPLUS') {
              if (value2.canHaveAmplus) {
                const policy = get(value, 'policy', defPolicy)
                  ? get(value, 'policy', defPolicy)
                  : defPolicy;
                // Set the max date as the current pad expiry.
                set(policy, 'dates.to', get(value2, 'paidExpireDate', null));
                this.selectionDone.emit({
                  ...value,
                  ...{
                    policy,
                  },
                });
              } else {
                this.checkPadResponse.emit(value2);
              }
              return;
            } else if (
              this.policyID === 'PAD' ||
              this.policyID === 'Garant AMPLUS + PAD'
            ) {
              if (value2.hasPaid) {
                this.checkPadResponse.emit(value2);
              } else {
                const policy = get(value, 'policy', defPolicy)
                  ? get(value, 'policy', defPolicy)
                  : defPolicy;
                // Set the min date as the server set up date.
                set(
                  policy,
                  'dates.to',
                  get(value2, 'paidMinimStartDate', null)
                );
                this.selectionDone.emit({
                  ...value,
                  ...{
                    policy,
                  },
                });
              }
            } else {
              this.selectionDone.emit(value);
            }
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
    console.log(this.vLocuinteList)
    if(this.locuinteId){
      if(this.selection){
        console.log(this.locuinteId)
        console.log(this.selection)
        this.selection.setValue(this.locuinteId)
        this.selection.updateValueAndValidity();
        this.cdRef.detectChanges()
      }
      this.cdRef.detectChanges()
      this.cdRef.markForCheck();
    }
    if (this.initialData && this.initialData.locuinta) {
      if (this.selection) {
        this.selection.setValue(this.initialData.locuinta.id);
        this.selection.updateValueAndValidity();
      }
      this.cdRef.markForCheck();
    }
  }
}
