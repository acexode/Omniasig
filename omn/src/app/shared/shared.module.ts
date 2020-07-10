import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { TabMenuComponent } from "./components/tab-menu/tab-menu.component";
import { SubPageComponent } from "./components/sub-page/sub-page.component";

@NgModule({
  declarations: [TabMenuComponent, SubPageComponent],
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [TabMenuComponent, SubPageComponent],
})
export class SharedModule {}
