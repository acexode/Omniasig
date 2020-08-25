import { Component, Input,Output ,  OnInit,  EventEmitter } from "@angular/core";

@Component({
  selector: 'app-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss'],
})
export class ExpandableComponent implements OnInit  {
  @Input() name : string;
  @Input() doc : [];  
  @Output() change : EventEmitter<string> = new EventEmitter<string>();
  public isMenuOpen : boolean = false;

  public toggleAccordion() : void
  {
      this.isMenuOpen = !this.isMenuOpen;
  }
  public broadcastName(name : string) : void
  {
     this.change.emit(name);
  }
  constructor() {}
  ngOnInit(): void {
    
  }
  

  
}