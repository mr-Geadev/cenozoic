import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocalizationApi } from 'api';
import { AboutUsPageComponent } from 'pages/about-us-page/about-us-page.component';

@NgModule({
  declarations: [
    AboutUsPageComponent,
  ],
  imports: [
    RouterModule.forRoot([
      { path: 'about', component: AboutUsPageComponent, pathMatch: 'full' },
    ], { scrollPositionRestoration: 'enabled' }),
    CommonModule,
  ],
  exports: [AboutUsPageComponent],
  providers: [
    LocalizationApi
  ]
})
export class AboutUsPageModule {
}
