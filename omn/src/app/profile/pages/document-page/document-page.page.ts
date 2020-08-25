import { Component, OnInit, HostBinding } from '@angular/core';
import { subPageHeaderPrimary } from 'src/app/shared/data/sub-page-header-primary';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document-page',
  templateUrl: './document-page.page.html',
  styleUrls: ['./document-page.page.scss'],
})
export class DocumentPagePage implements OnInit {
  headerConfig = subPageHeaderPrimary('OMNIASIG Vânzări');
 
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(data =>{
      console.log(data)
    })
    console.log(this.route.snapshot.data['name'])
  }


}
