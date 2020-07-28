import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Locuinte } from 'src/app/shared/models/data/locuinte';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';

@Component({
  selector: 'app-locuinte-form',
  templateUrl: './locuinte-form.component.html',
  styleUrls: ['./locuinte-form.component.scss'],
})
export class LocuinteFormComponent implements OnInit {
  headerConfig = subPageHeaderDefault('Adresa');
  dataModel: Locuinte;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {}
}
