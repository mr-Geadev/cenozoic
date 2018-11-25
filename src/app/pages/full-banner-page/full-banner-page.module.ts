import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FullBannerModule } from 'containers/full-banner';
import { FullBannerPageComponent } from 'pages/full-banner-page/full-banner-page.component';

import { LoginModalModule } from '../../pop-ups';

@NgModule({
  declarations: [
    FullBannerPageComponent,
  ],
  imports: [
    RouterModule.forRoot([
      { path: 'banner/:id', component: FullBannerPageComponent, pathMatch: 'full' },
    ]),
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    LoginModalModule,

    // Blocks
    FullBannerModule,
  ],
  exports: [FullBannerPageComponent],
})
export class FullBannerPageModule {
}
