import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConstructorBannerModule } from 'containers/constructor-banner';
import { BlankAccountGuard, LogInGuard, NotWorkerGuard, PaymentGuards } from 'guards';
import { ConstructorBannerPageComponent } from 'pages/constructor-banner-page/constructor-banner-page.component';

@NgModule({
  declarations: [
    ConstructorBannerPageComponent,
  ],
  imports: [
    RouterModule.forRoot([
      {
        path: 'create-banner',
        component: ConstructorBannerPageComponent,
        pathMatch: 'full',
        canActivate: [LogInGuard, NotWorkerGuard, BlankAccountGuard, PaymentGuards],
        data: { type: 'countPossibleCreateBanner'}
      },
    ]),
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ConstructorBannerModule,
  ],
  exports: [ConstructorBannerPageComponent],
})
export class ConstructorBannerPageModule {
}
