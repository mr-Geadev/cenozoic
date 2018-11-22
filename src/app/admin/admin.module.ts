import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule,
  MatMenuModule, MatSelectModule,
  MatTabsModule,
  MatToolbarModule,
} from '@angular/material';
import { NewsComponent } from 'admin/pages/news';
import { NewsApi } from 'api';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MainComponent } from './pages/main/main.component';
import { AdminResumeApi } from './pages/resume-list/admin-resume.api';
import { ResumeListComponent } from './pages/resume-list/resume-list.component';
import { FullUserInfoComponent } from './pages/users/full-user-info/full-user-info.component';
import { ItemUserComponent } from './pages/users/item-user/item-user.component';
import { UsersApi } from './pages/users/users.api';
import { UsersComponent } from './pages/users/users.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,

    // material
    MatDialogModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
  ],
  declarations: [
    // core
    AdminComponent,

    // pages
    ResumeListComponent,
    NewsComponent,
    SettingsComponent,
    MainComponent,
    UsersComponent,

    // containers
    ItemUserComponent,
    FullUserInfoComponent,
  ],
  providers: [
    UsersApi,
    NewsApi,
    AdminResumeApi,
  ],
})
export class AdminModule {
}
