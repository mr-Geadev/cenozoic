import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BannerComponent } from 'admin/pages/banner/banner.component';
import { LocalizationComponent } from 'admin/pages/localization/localization.component';
import { NewsComponent } from 'admin/pages/news/news.component';
import { StaticPageComponent } from 'admin/pages/static-page/static-page.component';
import { StatisticComponent } from 'admin/pages/statistic/statistic.component';
import { UserComponent } from 'admin/pages/user/user.component';
import { AdminGuard } from '../guards';
import { AdminComponent } from './admin.component';
import { MainComponent } from './pages/main/main.component';
import { ResumeListComponent } from './pages/resume-list/resume-list.component';
import { UsersComponent } from './pages/users/users.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '', component: MainComponent,
      },
      {
        path: 'resumeList', component: ResumeListComponent,
      },
      {
        path: 'users', component: UsersComponent,
      },
      {
        path: 'settings', component: SettingsComponent,
      },
      {
        path: 'news', component: NewsComponent,
      },
      {
        path: 'localization', component: LocalizationComponent,
      },
      {
        path: 'banners', component: BannerComponent,
      },
      {
        path: 'statistic', component: StatisticComponent,
      },
      {
        path: 'static-page', component: StaticPageComponent,
      },
      {
        path: 'user/:id', component: UserComponent,
      }
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
