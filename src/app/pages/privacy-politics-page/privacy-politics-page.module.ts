import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocalizationApi } from 'api';
import { PrivacyPoliticsPageComponent } from 'pages/privacy-politics-page/privacy-politics-page.component';
import { PipesModule } from 'pipes/pipes.module';

@NgModule({
  declarations: [
    PrivacyPoliticsPageComponent,
  ],
  imports: [
    RouterModule.forRoot([
      { path: 'privacy-politics', component: PrivacyPoliticsPageComponent, pathMatch: 'full' },
    ], { scrollPositionRestoration: 'enabled' }),
    CommonModule,
    PipesModule
  ],
  exports: [PrivacyPoliticsPageComponent],
  providers: [
    LocalizationApi
  ]
})
export class PrivacyPoliticsPageModule {
}
