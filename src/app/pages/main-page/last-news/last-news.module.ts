import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListNewsModule } from 'containers/list-news';

import { LastNewsComponent } from './last-news.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ListNewsModule,
  ],
  declarations: [LastNewsComponent],
  exports: [LastNewsComponent],
})
export class LastNewsModule {
}