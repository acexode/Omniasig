import { GeneralMessageModalComponent } from './components/general-message-modal/general-message-modal.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AccountNotActivatedComponent } from './components/account-not-activated/account-not-activated.component';
import { ArchiveListComponent } from './components/archive-list/archive-list.component';
import { DisabledPlaceholderComponent } from './components/disabled-placeholder/disabled-placeholder.component';
import { GenericErrorComponent } from './components/generic-error/generic-error.component';
import { GeneralErrorComponent } from './components/general-error/general-error.component';
import { ImageCardComponent } from './components/image-card/image-card.component';
import { LoadingPlaceholderComponent } from './components/loading-placeholder/loading-placeholder.component';
import { LocuinteCardComponent } from './components/locuinte-card/locuinte-card.component';
import { PolicyListComponent } from './components/policy-list/policy-list.component';
import { SubPageHeaderComponent } from './components/sub-page-header/sub-page-header.component';
import { TabMenuComponent } from './components/tab-menu/tab-menu.component';
import { CnpPipe } from './pipes/cnp.pipe';
import { LocuinteFieldPipe } from './pipes/locuinte-field.pipe';
import { LocuinteNamePipe } from './pipes/locuinte-name.pipe';
import { PolicyNamePipe } from './pipes/policy-name.pipe';
import { TimePipe } from './pipes/time.pipe';
import { ReplacePipe } from './pipes/replace.pipe';

@NgModule({
  declarations: [
    TabMenuComponent,
    ImageCardComponent,
    DisabledPlaceholderComponent,
    AccountNotActivatedComponent,
    PolicyListComponent,
    SubPageHeaderComponent,
    TimePipe,
    CnpPipe,
    LocuinteNamePipe,
    ArchiveListComponent,
    LocuinteCardComponent,
    LocuinteFieldPipe,
    LoadingPlaceholderComponent,
    GenericErrorComponent,
    GeneralErrorComponent,
    PolicyNamePipe,
    ReplacePipe,
    GeneralMessageModalComponent,
  ],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  exports: [
    TabMenuComponent,
    ImageCardComponent,
    DisabledPlaceholderComponent,
    PolicyListComponent,
    TabMenuComponent,
    SubPageHeaderComponent,
    AccountNotActivatedComponent,
    TimePipe,
    CnpPipe,
    ReplacePipe,
    LocuinteFieldPipe,
    LocuinteNamePipe,
    PolicyNamePipe,
    ArchiveListComponent,
    LocuinteCardComponent,
    LoadingPlaceholderComponent,
    GenericErrorComponent,
    GeneralErrorComponent,
    GeneralMessageModalComponent,
  ],
})
export class SharedModule {}
