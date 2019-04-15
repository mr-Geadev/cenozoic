import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BannerApi } from 'api';
import { FullBannerComponent } from 'containers/full-banner/full-banner.component';
import { PipesModule } from 'pipes/pipes.module';
import { PayingModalService } from 'pop-ups/paying';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PipesModule
  ],
  declarations: [
    FullBannerComponent,
  ],
  providers: [BannerApi, PayingModalService],
  exports: [FullBannerComponent],
})
export class FullBannerModule {
}
