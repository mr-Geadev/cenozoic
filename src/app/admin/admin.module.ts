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
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { EditorModule } from '@tinymce/tinymce-angular';
import { BannerComponent } from 'admin/pages/banner/banner.component';
import { LocalizationComponent } from 'admin/pages/localization/localization.component';
import { NewsComponent } from 'admin/pages/news';
import { StaticPageComponent } from 'admin/pages/static-page/static-page.component';
import { StatisticComponent } from 'admin/pages/statistic/statistic.component';
import { EmployerAnalyticsComponent } from 'admin/pages/users/employer-analytics/employer-analytics.component';
import { WorkerAnalyticsComponent } from 'admin/pages/users/worker-analytics/worker-analytics.component';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalizationApi } from '../api/localization.api';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,

    EditorModule,

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
    NgxChartsModule,
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
    LocalizationComponent,
    BannerComponent,
    StatisticComponent,
    StaticPageComponent,

    // containers
    ItemUserComponent,
    FullUserInfoComponent,
    EmployerAnalyticsComponent,
    WorkerAnalyticsComponent
  ],
  providers: [
    UsersApi,
    NewsApi,
    AdminResumeApi,
    LocalizationApi,
  ],
})
export class AdminModule {
}
