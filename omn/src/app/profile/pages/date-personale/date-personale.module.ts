import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { DatePersonalePageRoutingModule } from "./date-personale-routing.module";

import { DatePersonalePage } from "./date-personale.page";

import { SharedModule } from "../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatePersonalePageRoutingModule,
    SharedModule,
  ],
  declarations: [DatePersonalePage],
})
export class DatePersonalePageModule {}
