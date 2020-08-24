import { AfterViewInit, Component, HostBinding, OnInit } from '@angular/core';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';
  headerConfig = subPageHeaderDefault('');

  // Create an interface for this
  faqs: Array<{ question: string; answer: string }> = [
    {
      question: 'Cum accesez contul creat?',
      answer:
        'Nam laoreet nunc eu molestie condimentum. Pellentesque sit amet mauris orci. Quisque sed scelerisque ipsum. Curabitur congue est sit amet felis vehicula ultrices. Curabitur dictum odio quam, ac pharetra mauris tempus a. In ornare ex urna, faucibus elementum elit fermentum non. Quisque euismod venenatis metus. Nam laoreet nunc eu molestie condimentum. Pellentesque sit amet mauris orci. Quisque sed scelerisque ipsum. Curabitur congue est sit amet felis vehicula ultrices. Curabitur dictum odio quam, ac pharetra mauris tempus a. In ornare ex urna, faucibus elementum elit fermentum non. Quisque euismod venenatis metus.',
    },
    {
      question:
        'Care sunt datele mele de logare (user & parolă) în aplicația OMNIASIG?',
      answer:
        ' Nam laoreet nunc eu molestie condimentum. Pellentesque sit amet mauris orci. Quisque sed scelerisque ipsum. Curabitur congue est sit amet felis vehicula ultrices. Curabitur dictum odio quam, ac pharetra mauris tempus a. In ornare ex urna, faucibus elementum elit fermentum non. Quisque euismod venenatis metus.',
    },
    {
      question: 'Care sunt avantajele unui cont creat în aplicația OMNIASIG?',
      answer:
        'Nam laoreet nunc eu molestie condimentum. Pellentesque sit amet mauris orci. Quisque sed scelerisque ipsum. Curabitur congue est sit amet felis vehicula ultrices. Curabitur dictum odio quam, ac pharetra mauris tempus a. In ornare ex urna, faucibus elementum elit fermentum non. Quisque euismod venenatis metus.',
    },
    {
      question: 'Cum modific datele mele personale în aplicația OMNIASIG?',
      answer:
        ' Nam laoreet nunc eu molestie condimentum. Pellentesque sit amet mauris orci. Quisque sed scelerisque ipsum. Curabitur congue est sit amet felis vehicula ultrices. Curabitur dictum odio quam, ac pharetra mauris tempus a. In ornare ex urna, faucibus elementum elit fermentum non. Quisque euismod venenatis metus.',
    },
    {
      question:
        'Ce se întâmplă cu datele mele în cazul în care dezinstalez aplicația OMNIASIG?',
      answer:
        'Nam laoreet nunc eu molestie condimentum. Pellentesque sit amet mauris orci. Quisque sed scelerisque ipsum. Curabitur congue est sit amet felis vehicula ultrices. Curabitur dictum odio quam, ac pharetra mauris tempus a. In ornare ex urna, faucibus elementum elit fermentum non. Quisque euismod venenatis metus.',
    },
    {
      question:
        'Pe ce tipuri de dispozitive mobile poate fi instalată aplicația OMNIASIG?',
      answer:
        ' Nam laoreet nunc eu molestie condimentum. Pellentesque sit amet mauris orci. Quisque sed scelerisque ipsum. Curabitur congue est sit amet felis vehicula ultrices. Curabitur dictum odio quam, ac pharetra mauris tempus a. In ornare ex urna, faucibus elementum elit fermentum non. Quisque euismod venenatis metus.',
    },
    {
      question: 'Cine are acces la datele mele din aplicația OMNIASIG?',
      answer:
        'Nam laoreet nunc eu molestie condimentum. Pellentesque sit amet mauris orci. Quisque sed scelerisque ipsum. Curabitur congue est sit amet felis vehicula ultrices. Curabitur dictum odio quam, ac pharetra mauris tempus a. In ornare ex urna, faucibus elementum elit fermentum non. Quisque euismod venenatis metus.',
    },
    {
      question: 'Cum șterg contul creat în aplicația OMNIASIG?',
      answer:
        ' Nam laoreet nunc eu molestie condimentum. Pellentesque sit amet mauris orci. Quisque sed scelerisque ipsum. Curabitur congue est sit amet felis vehicula ultrices. Curabitur dictum odio quam, ac pharetra mauris tempus a. In ornare ex urna, faucibus elementum elit fermentum non. Quisque euismod venenatis metus.',
    },
    {
      question:
        'Cum accesez contul în cazul în care am uitat de logare în aplicația OMNIASIG?',
      answer:
        'Nam laoreet nunc eu molestie condimentum. Pellentesque sit amet mauris orci. Quisque sed scelerisque ipsum. Curabitur congue est sit amet felis vehicula ultrices. Curabitur dictum odio quam, ac pharetra mauris tempus a. In ornare ex urna, faucibus elementum elit fermentum non. Quisque euismod venenatis metus.',
    },
    {
      question:
        'Cum pot încheia o poliță de asigurare direct din aplicația OMNIASIG?',
      answer:
        'Nam laoreet nunc eu molestie condimentum. Pellentesque sit amet mauris orci. Quisque sed scelerisque ipsum. Curabitur congue est sit amet felis vehicula ultrices. Curabitur dictum odio quam, ac pharetra mauris tempus a. In ornare ex urna, faucibus elementum elit fermentum non. Quisque euismod venenatis metus.',
    },
    {
      question:
        'Pot să aflu data scadentă pentru asigurările mele direct din aplicația OMNIASIG?',
      answer:
        'Nam laoreet nunc eu molestie condimentum. Pellentesque sit amet mauris orci. Quisque sed scelerisque ipsum. Curabitur congue est sit amet felis vehicula ultrices. Curabitur dictum odio quam, ac pharetra mauris tempus a. In ornare ex urna, faucibus elementum elit fermentum non. Quisque euismod venenatis metus.',
    },
    {
      question:
        'Cum procedez în cazul în care doresc prelungirea poliței mele de asigurare?',
      answer:
        'Nam laoreet nunc eu molestie condimentum. Pellentesque sit amet mauris orci. Quisque sed scelerisque ipsum. Curabitur congue est sit amet felis vehicula ultrices. Curabitur dictum odio quam, ac pharetra mauris tempus a. In ornare ex urna, faucibus elementum elit fermentum non. Quisque euismod venenatis metus.',
    },
    {
      question: 'Ce sunt condițiile de asigurare și unde le pot găsi?',
      answer:
        'Nam laoreet nunc eu molestie condimentum. Pellentesque sit amet mauris orci. Quisque sed scelerisque ipsum. Curabitur congue est sit amet felis vehicula ultrices. Curabitur dictum odio quam, ac pharetra mauris tempus a. In ornare ex urna, faucibus elementum elit fermentum non. Quisque euismod venenatis metus.',
    },
    {
      question: 'Pot face plata poliței de asigurare și în rate?',
      answer:
        'Nam laoreet nunc eu molestie condimentum. Pellentesque sit amet mauris orci. Quisque sed scelerisque ipsum. Curabitur congue est sit amet felis vehicula ultrices. Curabitur dictum odio quam, ac pharetra mauris tempus a. In ornare ex urna, faucibus elementum elit fermentum non. Quisque euismod venenatis metus.',
    },
    {
      question:
        'Cum sunt despăgubit în cazul în care se întamplă evenimentul asigurat?',
      answer:
        'Nam laoreet nunc eu molestie condimentum. Pellentesque sit amet mauris orci. Quisque sed scelerisque ipsum. Curabitur congue est sit amet felis vehicula ultrices. Curabitur dictum odio quam, ac pharetra mauris tempus a. In ornare ex urna, faucibus elementum elit fermentum non. Quisque euismod venenatis metus.',
    },
    {
      question:
        'În cât timp voi fi despăgubit în cazul producerii unui incident?',
      answer:
        'Nam laoreet nunc eu molestie condimentum. Pellentesque sit amet mauris orci. Quisque sed scelerisque ipsum. Curabitur congue est sit amet felis vehicula ultrices. Curabitur dictum odio quam, ac pharetra mauris tempus a. In ornare ex urna, faucibus elementum elit fermentum non. Quisque euismod venenatis metus.',
    },
    {
      question: 'Când trebuie să anunț că s-a întamplat o daună?',
      answer:
        'Nam laoreet nunc eu molestie condimentum. Pellentesque sit amet mauris orci. Quisque sed scelerisque ipsum. Curabitur congue est sit amet felis vehicula ultrices. Curabitur dictum odio quam, ac pharetra mauris tempus a. In ornare ex urna, faucibus elementum elit fermentum non. Quisque euismod venenatis metus.',
    },
    {
      question:
        'Ce pași trebuie să urmez în cazul producerii unei daune în locuință?',
      answer:
        'Nam laoreet nunc eu molestie condimentum. Pellentesque sit amet mauris orci. Quisque sed scelerisque ipsum. Curabitur congue est sit amet felis vehicula ultrices. Curabitur dictum odio quam, ac pharetra mauris tempus a. In ornare ex urna, faucibus elementum elit fermentum non. Quisque euismod venenatis metus.',
    },
    {
      question: 'Este obligatoriu să închei o asigurare pentru locuință?',
      answer:
        'Nam laoreet nunc eu molestie condimentum. Pellentesque sit amet mauris orci. Quisque sed scelerisque ipsum. Curabitur congue est sit amet felis vehicula ultrices. Curabitur dictum odio quam, ac pharetra mauris tempus a. In ornare ex urna, faucibus elementum elit fermentum non. Quisque euismod venenatis metus.',
    },
    {
      question:
        'Care sunt tipurile de imobil ce nu pot fi asigurate printr-o poliță Garant Amplus?',
      answer:
        'Nam laoreet nunc eu molestie condimentum. Pellentesque sit amet mauris orci. Quisque sed scelerisque ipsum. Curabitur congue est sit amet felis vehicula ultrices. Curabitur dictum odio quam, ac pharetra mauris tempus a. In ornare ex urna, faucibus elementum elit fermentum non. Quisque euismod venenatis metus.',
    },
    {
      question: 'Pot să depun o petiție prin aplicația OMNIASIG?',
      answer:
        'Nam laoreet nunc eu molestie condimentum. Pellentesque sit amet mauris orci. Quisque sed scelerisque ipsum. Curabitur congue est sit amet felis vehicula ultrices. Curabitur dictum odio quam, ac pharetra mauris tempus a. In ornare ex urna, faucibus elementum elit fermentum non. Quisque euismod venenatis metus.',
    },
    {
      question:
        'Pot să văd care este statusul de soluționare pentru direct în aplicația OMNIASIG?',
      answer:
        'Nam laoreet nunc eu molestie condimentum. Pellentesque sit amet mauris orci. Quisque sed scelerisque ipsum. Curabitur congue est sit amet felis vehicula ultrices. Curabitur dictum odio quam, ac pharetra mauris tempus a. In ornare ex urna, faucibus elementum elit fermentum non. Quisque euismod venenatis metus.',
    },
    {
      question: 'Ce trebuie să știu despre aplicația OMNIASIG?',
      answer:
        'Nam laoreet nunc eu molestie condimentum. Pellentesque sit amet mauris orci. Quisque sed scelerisque ipsum. Curabitur congue est sit amet felis vehicula ultrices. Curabitur dictum odio quam, ac pharetra mauris tempus a. In ornare ex urna, faucibus elementum elit fermentum non. Quisque euismod venenatis metus.',
    },
  ];

  constructor() {
   this.isOpen = Array(this.faqs.length).fill(false)  
  }

  ngOnInit() {}

isOpen: Array<boolean>

  handleToogle(e){
      this.isOpen[e.target.value] = !this.isOpen[e.target.value]
      
      var panel = e.target.nextElementSibling;

      if(this.isOpen[e.target.value]){
         panel.style.height = panel.scrollView + "px"
      }else{
         panel.style.height = 0+"px"
      }
      console.log("*****************************", panel, panel.style)
  }
}
