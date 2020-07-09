import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProfilComponent } from "./main/profil/profil.component";

const routes: Routes = [
  {
    path: "",
    component: ProfilComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
