import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FullNewsModule } from 'containers/full-news';
import { NewsFullPageComponent } from './news-full-page.component';

import { LoginModalModule } from '../../pop-ups';

@NgModule({
  declarations: [
    NewsFullPageComponent,
  ],
  imports: [
    RouterModule.forRoot([
      { path: 'news/:id', component: NewsFullPageComponent, pathMatch: 'full' },
    ], {scrollPositionRestoration: 'enabled'}),
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    LoginModalModule,

    // Blocks
    FullNewsModule
  ],
  exports: [NewsFullPageComponent],
})
export class NewsFullPageModule {
}
