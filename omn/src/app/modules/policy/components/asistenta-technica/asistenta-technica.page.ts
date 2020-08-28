import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { subPageHeaderPrimary } from 'src/app/shared/data/sub-page-header-primary';
import { AsistentaModalPagePage } from '../asistenta-modal-page/asistenta-modal-page.page';

@Component({
  selector: 'app-asistenta-technica',
  templateUrl: './asistenta-technica.page.html',
  styleUrls: ['./asistenta-technica.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsistentaTechnicaPage implements OnInit {
  headerConfig = subPageHeaderPrimary('Asistență tehnică');
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

  constructor(
    public modalCtrl: ModalController,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) {}
  ngOnInit() {}

  async openModal(type) {
    console.log('click');
    const modal = await this.modalCtrl.create({
      component: AsistentaModalPagePage,
      componentProps: { type },
      cssClass: 'my-custom-modal-class',
    });
    return await modal.present();
  }

  get planField() {
    return this.formGroup.get('plan');
  }
}
