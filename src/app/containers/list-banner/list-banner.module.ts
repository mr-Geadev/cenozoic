import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BannerApi } from 'api';
import { ListBannerComponent } from 'containers/list-banner/list-banner.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    ListBannerComponent,
  ],
  exports: [ListBannerComponent],
  providers: [BannerApi],
})
export class ListBannerModule {
}
