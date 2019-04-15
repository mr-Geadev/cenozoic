import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocalizationApi } from 'api';
import { AboutUsPageComponent } from 'pages/about-us-page/about-us-page.component';
import { PipesModule } from 'pipes/pipes.module';

@NgModule({
  declarations: [
    AboutUsPageComponent,
  ],
  imports: [
    RouterModule.forRoot([
      { path: 'about', component: AboutUsPageComponent, pathMatch: 'full' },
    ], { scrollPositionRestoration: 'enabled' }),
    CommonModule,
    PipesModule
  ],
  exports: [AboutUsPageComponent],
  providers: [
    LocalizationApi
  ]
})
export class AboutUsPageModule {
}
