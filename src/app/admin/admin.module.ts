import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule, MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule, MatNativeDateModule,
  MatSelectModule,
  MatTabsModule,
  MatToolbarModule,
} from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { EditorModule } from '@tinymce/tinymce-angular';
import { BannerComponent } from 'admin/pages/banner/banner.component';
import { ChatsAdminComponent } from 'admin/pages/chats/chats-admin.component';
import { LocalizationComponent } from 'admin/pages/localization/localization.component';
import { NewsComponent } from 'admin/pages/news';
import { StaticPageComponent } from 'admin/pages/static-page/static-page.component';
import { StatisticComponent } from 'admin/pages/main/statistic/statistic.component';
import { EmployerAnalyticsComponent } from 'admin/pages/user/employer-analytics/employer-analytics.component';
import { UserResumeComponent } from 'admin/pages/user/user-resume/user-resume.component';
import { UserVacancyComponent } from 'admin/pages/user/user-vacancy/user-vacancy.component';
import { UserComponent } from 'admin/pages/user/user.component';
import { WorkerAnalyticsComponent } from 'admin/pages/user/worker-analytics/worker-analytics.component';
import { VerifyListComponent } from 'admin/pages/verify-list/verify-list.component';
import { NewsApi } from 'api';
import { ChatsModule } from 'containers/chats';
import { QuillModule } from 'ngx-quill';
import { LocalizationApi } from '../api/localization.api';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MainComponent } from './pages/main/main.component';
import { AdminResumeApi } from './pages/resume-list/admin-resume.api';
import { ResumeListComponent } from './pages/resume-list/resume-list.component';
import { CitiesComponent } from './pages/cities/cities.component';
import { ItemUserComponent } from './pages/users/item-user/item-user.component';
import { UsersApi } from './pages/users/users.api';
import { UsersComponent } from './pages/users/users.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,

    EditorModule,
    QuillModule,
    ChatsModule,

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
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [
    // core
    AdminComponent,

    // pages
    ResumeListComponent,
    NewsComponent,
    CitiesComponent,
    MainComponent,
    UsersComponent,
    LocalizationComponent,
    BannerComponent,
    StatisticComponent,
    StaticPageComponent,
    UserComponent,
    ChatsAdminComponent,
    VerifyListComponent,

    // containers
    ItemUserComponent,
    EmployerAnalyticsComponent,
    WorkerAnalyticsComponent,
    UserResumeComponent,
    UserVacancyComponent
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
