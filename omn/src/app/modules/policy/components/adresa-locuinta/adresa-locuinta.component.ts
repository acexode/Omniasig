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
  @Input() set locuinteList(lV) {
    this.fullList = lV;
    // Split based on policy availability.
    this.vLocuinteList = lV.filter((vv) => !vv.policy).map((v) => v);
    this.vLocuinteListP = lV.filter((vv) => vv.policy).map((v) => v);
    this.initLocuintaMainForm();
    this.cdRef.markForCheck();
  }
  @Output() selectionDone: EventEmitter<
    string | PolicyLocuintaListItem
  > = new EventEmitter();

  @Input() initialData: PolicyLocuintaListItem = null;
  locuintaForm = this.fb.group({
    selection: this.fb.control('', Validators.required),
  });
  constructor(private cdRef: ChangeDetectorRef, private fb: FormBuilder) {}

  ngOnInit() {
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
    const value = this.fullList.find((lI) => get(lI, 'locuinta.id', -1) === id);
    if (value) {
      this.selectionDone.emit(value);
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
