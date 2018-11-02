import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
  providers: [],
})
export class ListNewsModule {
}