import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss'],
})
export class ExpandableComponent implements OnInit {
  @Input() name: string;
  @Input() doc: any;
  @Output() changeEv: EventEmitter<string> = new EventEmitter();
  public isMenuOpen = false;

  public toggleAccordion(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  public broadcastName(name: string): void {
    console.log(name)
    this.changeEv.emit(name);
  }
  constructor() {}
  ngOnInit(): void {}
}
