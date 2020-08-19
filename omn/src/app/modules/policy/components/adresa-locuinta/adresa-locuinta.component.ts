import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LocuinteService } from 'src/app/profile/pages/locuinte/services/locuinte/locuinte.service';
import { PolicyLocuintaListItem } from './../../../../shared/models/component/policy-locuinta-list-item';

@Component({
  selector: 'app-adresa-locuinta',
  templateUrl: './adresa-locuinta.component.html',
  styleUrls: ['./adresa-locuinta.component.scss'],
})
export class AdresaLocuintaComponent implements OnInit {
  vLocuinteList: Array<PolicyLocuintaListItem> = [];
  vLocuinteListP: Array<PolicyLocuintaListItem> = [];
  addNew = 'ADD_NEW';
  @Input() set locuinteList(lV) {
    this.vLocuinteList = lV.filter((vv) => !vv.policy).map((v) => v);
    this.vLocuinteListP = lV.filter((vv) => vv.policy).map((v) => v);
    console.log(lV);
    this.cdRef.markForCheck();
  }

  locuintaForm = this.fb.group({
    selection: this.fb.control('', Validators.required),
  });

  version = 1;
  list: any = [];
  constructor(
    private LocuinteS: LocuinteService,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.LocuinteS.getLocuinteWithPolicy('2').subscribe((v) => {
      this.list = v;
    });
  }

  continue() {
    if (this.version < 4) {
      this.version++;
      return;
    }
    this.version = 1;
  }
}
