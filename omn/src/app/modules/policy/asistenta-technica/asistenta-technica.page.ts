import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonRadioGroup } from '@ionic/angular';
import { AsistentaModalPagePage } from '../asistenta-modal-page/asistenta-modal-page.page';
@Component({
  selector: 'app-asistenta-technica',
  templateUrl: './asistenta-technica.page.html',
  styleUrls: ['./asistenta-technica.page.scss'],
})
export class AsistentaTechnicaPage implements OnInit {
  cardClass = 'm-0 w-100 flex-column flex is-link mh-160 shadow-page-item  md hydrated mb-10'
  activeState = 'gold';
  @ViewChild('radioGroup') radioGroup: IonRadioGroup
  selectedRadioGroup:any;
  //Get value on ionSelect on IonRadio item
  selectedRadioItem:any;
  plans = [
    {
      text: 'Inclus în prețul poliței',
      plan: 'Planul Gold',
      planColor: 'white',
      cardClass: `${this.cardClass } `,
      image: '/assets/custom-ion-icons/Gold@2x.svg',
      checkColor: '#004220',
      value: 'gold',
      state: 'active',
      name: 'radio_list',
      checked: false,
       disabled: false,
       color: 'primary'
    },
    {
      text: '8 Euro',
      textColor: 'dark',
      plan: 'Planul VIP',
      planColor: 'success',
      cardClass: `${this.cardClass }`,
      image: '/assets/custom-ion-icons/VIP@2x.svg',
      checkColor: '#f1f1f1',
      value: 'vip',
      state: '',
      name: 'radio_list',
      checked: false,
       disabled: false,
       color: 'light'
    }
  ]
  
  constructor(public modalCtrl : ModalController) { }


  async  openModal(type){ 
      this.radioGroup.value = 'vip'   
      console.log(this.radioGroup.value)
      if(type == 'gold'){
        this.radioGroup.value = 'gold'   
        this.plans[0].state = 'active'
        this.plans[1].state = ''
        // this.plans[0].cardClass += ' fond'
      }else{
        this.radioGroup.value = 'vip'   
        this.plans[0].state = ''
        this.plans[1].state = 'active'
      }
    const modal = await this.modalCtrl.create({
      component: AsistentaModalPagePage,
      cssClass: 'my-custom-class',
      componentProps: {type}
    });
    return await modal.present();
  }    
  
  ngOnInit() {
  }
 

 



}
