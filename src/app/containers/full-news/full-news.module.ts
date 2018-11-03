import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NewsApi } from 'api';
import { FullNewsComponent } from 'containers/full-news/full-news.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    FullNewsComponent,
  ],
  providers: [NewsApi],
  exports: [FullNewsComponent],
})
export class FullNewsModule {
}