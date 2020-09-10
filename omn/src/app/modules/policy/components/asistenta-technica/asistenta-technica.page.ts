import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AsistentaModalPagePage } from '../asistenta-modal-page/asistenta-modal-page.page';

@Component({
  selector: 'app-asistenta-technica',
  templateUrl: './asistenta-technica.page.html',
  styleUrls: ['./asistenta-technica.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsistentaTechnicaPage implements OnInit {
  @Input() assisFormData;
  plans = [
    {
      text: 'Inclus în prețul poliței',
      plan: 'Planul Gold',
      image: 'md-gold',
      value: 'gold',
      state: '',
      name: 'radio_list',
      color: 'primary',
    },
    {
      text: '8 Euro',
      plan: 'Planul VIP',
      image: 'md-vip',
      value: 'vip',
      state: '',
      name: 'radio_list',
      color: 'light',
    },
  ];

  formGroup = this.fb.group({
    plan: this.fb.control(false, Validators.required),
  });

  @Output() emitForm: EventEmitter<any> = new EventEmitter();

  constructor(
    public modalCtrl: ModalController,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (this.assisFormData) {
      this.formGroup.setValue(this.assisFormData);
    } else {
      this.formGroup.setValue({ plan: this.plans[0].value });
    }
  }

  openModal(type) {
    this.modalCtrl
      .create({
        component: AsistentaModalPagePage,
        componentProps: { type },
        cssClass: 'assistance-modal',
      })
      .then((modal) => {
        Promise.resolve(modal.present());
      });
  }

  get planField() {
    return this.formGroup.get('plan');
  }

  submit() {
    this.emitForm.emit(this.formGroup.value);
  }
}
