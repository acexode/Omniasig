import { NavigationExtras, Router } from '@angular/router';

import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { set } from 'lodash';
import { FormBuilder, Validators } from '@angular/forms';
import { get } from 'lodash';
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
  loaderTitle = 'Verificăm datele în portalul PAID…';
  @Input() set locuinteList(lV) {
    this.fullList = lV;
    // Split based on policy availability.
    this.vLocuinteList = lV.filter((vv) => !vv.policy).map((v) => v);
    this.vLocuinteListP = lV.filter((vv) => vv.policy).map((v) => v);
    console.log(this.vLocuinteList)
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
    protected router : Router
  ) {
    this.authS.getAuthState().subscribe((authData) => {
      this.userId = authData.account.userId;
    });
  }

  ngOnInit() {
    this.authS.getAuthState().subscribe((authData) => {
      this.userId = authData.account.userId;
    });

    this.initLocuintaMainForm();
  }

  submitForm() {
    this.checkPAD = true;
    if (this.locuintaForm.valid) {
      const controlS = this.locuintaForm.get('selection');
      let selected = this.vLocuinteList.filter(e => e.locuinta.id == controlS.value)[0]
      console.log(controlS)
      console.log(selected)
      if (selected.locuinta.yearConstruction != 0) {
        const value = controlS.value;
        if (value !== 'ADD_NEW') {
          this.emitLocuintaItemById(value);
        } else {
          this.selectionDone.emit(value);
        }
      }else{
        const navigationExtras: NavigationExtras = {
          state: {
            data: selected,
          }
        };
        this.router.navigateByUrl('/profil/locuinte/add',navigationExtras)
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
              } else {
                this.checkPadResponse.emit(value2);
              }
              return;
            } else if (this.policyID === 'PAD') {
              if (value2.hasPaid) {
                this.checkPadResponse.emit(value2);
              } else {
                const policy = get(value, 'policy', defPolicy)
                  ? get(value, 'policy', defPolicy)
                  : defPolicy;
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
              // TODO: check for AMPLUS+ PAD
              // To be removed: this allows smooth flow for AMPLUS+ PAD workflow
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
    if (this.initialData && this.initialData.locuinta) {
      if (this.selection) {
        this.selection.setValue(this.initialData.locuinta.id);
        this.selection.updateValueAndValidity();
      }
      this.cdRef.markForCheck();
    }
  }
}
