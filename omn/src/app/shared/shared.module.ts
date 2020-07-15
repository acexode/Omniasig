<<<<<<< HEAD
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { TabMenuComponent } from "./components/tab-menu/tab-menu.component";
import { SubPageHeaderComponent } from "./components/sub-page-header/sub-page-header.component";

@NgModule({
  declarations: [TabMenuComponent, SubPageHeaderComponent],
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [TabMenuComponent, SubPageHeaderComponent],
=======
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DisabledPlaceholderComponent } from './components/disabled-placeholder/disabled-placeholder.component';
import { ImageCardComponent } from './components/image-card/image-card.component';
import { PolicyListComponent } from './components/policy-list/policy-list.component';
import { TabMenuComponent } from './components/tab-menu/tab-menu.component';

@NgModule({
  declarations: [
    TabMenuComponent,
    ImageCardComponent,
    DisabledPlaceholderComponent,
    PolicyListComponent,
  ],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  exports: [
    TabMenuComponent,
    ImageCardComponent,
    DisabledPlaceholderComponent,
    PolicyListComponent,
  ],
>>>>>>> f6ea9ace60478f55e9ce5a51240071e130086bba
})
export class SharedModule {}
