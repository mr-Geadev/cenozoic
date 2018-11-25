import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BannerApi } from 'api';
import { FullBannerComponent } from 'containers/full-banner/full-banner.component';
import { PayingModalService } from 'pop-ups/paying';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  declarations: [
    FullBannerComponent,
  ],
  providers: [BannerApi, PayingModalService],
  exports: [FullBannerComponent],
})
export class FullBannerModule {
}
