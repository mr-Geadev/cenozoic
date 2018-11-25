import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BannerApi } from 'api';
import { FullBannerComponent } from 'containers/full-banner/full-banner.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  declarations: [
    FullBannerComponent,
  ],
  providers: [BannerApi],
  exports: [FullBannerComponent],
})
export class FullBannerModule {
}
