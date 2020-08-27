import { Component, OnInit, HostBinding } from '@angular/core';
import { subPageHeaderCustom } from 'src/app/shared/data/sub-page-header-custom';


@Component({
  selector: 'app-document-page',
  templateUrl: './document-page.page.html',
  styleUrls: ['./document-page.page.scss'],
})
export class DocumentPagePage implements OnInit {
  headerConfig = subPageHeaderCustom('OMNIASIG Vânzări', 'bg-state');
 
  constructor() { }

  ngOnInit() {
    
    
  }


}
