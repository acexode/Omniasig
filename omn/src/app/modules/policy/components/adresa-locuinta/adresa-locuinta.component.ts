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
import { PolicyOffer } from 'src/app/shared/models/data/policy-offer';
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
  loaderTitle = "llllllllllll"
  @Input() set locuinteList(lV) {
    this.fullList = lV;
    // Split based on policy availability.
    this.vLocuinteList = lV.filter((vv) => !vv.policy).map((v) => v);
    this.vLocuinteListP = lV.filter((vv) => vv.policy).map((v) => v);
    this.initLocuintaMainForm();
    this.cdRef.markForCheck();
  };
  @Output() selectionDone: EventEmitter<
    string | PolicyLocuintaListItem
  > = new EventEmitter();
  @Output() checkPadResponse: EventEmitter<any> = new EventEmitter();
  @Input() initialData: PolicyLocuintaListItem = null;
  locuintaForm = this.fb.group({
    selection: this.fb.control('', Validators.required),
  });
  constructor(private cdRef: ChangeDetectorRef, private fb: FormBuilder, private authS: AuthService, private paidS: PaidExternalService) {
    this.authS.getAuthState().subscribe((authData) => {
      this.userId = authData.account.userId;
    });
  }

  ngOnInit() {
    this.initLocuintaMainForm();
  }

  submitForm() {
    this.checkPAD = true;
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
    const value = this.fullList.find((lI) => get(lI, 'locuinta.id', -1) === id);
    if (value) {
      console.log("CHECKPAD22222222222", value.locuinta.id, this.userId)
      // this.paidS.CheckPAD({locationId: parseInt(value.locuinta.id), userId: this.userId})
      this.paidS.CheckPAD({locationId: 79, userId: this.userId})
      .subscribe(
        (value)=>{
          if(value.hasPaid){
            // this.checkPadResponse.emit(value.paidExpireDate);
            this.checkPadResponse.emit(value);
          }else{
            this.selectionDone.emit(value);
          }
        },
        (error)=>{
        // Emit error here
          console.log(error);
        }
      )
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
