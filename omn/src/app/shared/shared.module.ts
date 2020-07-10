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
})
export class SharedModule {}
