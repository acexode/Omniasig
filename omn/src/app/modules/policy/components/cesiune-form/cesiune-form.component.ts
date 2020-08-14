import { Component, OnInit } from '@angular/core';
import { EnumCesiuneItem } from './../models/cesiune-item'

@Component({
  selector: 'app-cesiune-form',
  templateUrl: './cesiune-form.component.html',
  styleUrls: ['./cesiune-form.component.scss'],
})
export class CesiuneFormComponent implements OnInit {

  radioValue: boolean = false;
  numberOfItems: number = 1;
  cesuineItems: EnumCesiuneItem[]
  itemsArray: [] = []

  constructor( ) { 
    this.itemsArray = Array.apply(null, {length: 1}).map(Number.call, Number)
  }

  radioChangeHandler(event: any){
    event.target.value === "da"? this.radioValue = true : this.radioValue = false
  }

  increaseNumberOfItems(){
    if(this.numberOfItems < 2){
      this.numberOfItems++
      this.itemsArray = Array.apply(null, {length: this.numberOfItems}).map(Number.call, Number)
    }
  }

  decreaseNumberOfItems(){
    if(this.numberOfItems > 1){
      this.numberOfItems--
      this.itemsArray = Array.apply(null, {length: this.numberOfItems}).map(Number.call, Number)
    }
  }

  onSubmit(event: any){
  }

  ngOnInit() {
  }
}
