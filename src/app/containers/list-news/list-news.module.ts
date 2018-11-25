import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BannerApi, NewsApi } from 'api';
import { ListNewsComponent } from 'containers/list-news/list-news.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    ListNewsComponent,
  ],
  exports: [ListNewsComponent],
  providers: [NewsApi, BannerApi],
})
export class ListNewsModule {
}
