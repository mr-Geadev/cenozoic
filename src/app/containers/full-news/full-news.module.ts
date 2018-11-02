import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FullNewsComponent } from 'containers/full-news/full-news.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    FullNewsComponent,
  ],
  exports: [FullNewsComponent],
})
export class FullNewsModule {
}