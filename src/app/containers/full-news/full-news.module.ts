import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NewsApi } from 'api';
import { FullNewsComponent } from 'containers/full-news/full-news.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    FullNewsComponent,
  ],
  providers: [NewsApi],
  exports: [FullNewsComponent],
})
export class FullNewsModule {
}