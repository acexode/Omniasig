import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { TabMenuComponent } from "./components/tab-menu/tab-menu.component";

@NgModule({
  declarations: [TabMenuComponent],
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [TabMenuComponent],
})
export class SharedModule {}
