import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrivacyPoliticsPageComponent } from 'pages/privacy-politics-page/privacy-politics-page.component';

@NgModule({
  declarations: [
    PrivacyPoliticsPageComponent,
  ],
  imports: [
    RouterModule.forRoot([
      { path: 'privacy-politics', component: PrivacyPoliticsPageComponent, pathMatch: 'full' },
    ], { scrollPositionRestoration: 'enabled' }),
    CommonModule,
  ],
  exports: [PrivacyPoliticsPageComponent],
})
export class PrivacyPoliticsPageModule {
}
