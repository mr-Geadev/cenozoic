import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ListNewsModule } from 'containers/list-news';
import { ListNewsPageComponent } from 'pages/list-news-page/list-news-page.component';

@NgModule({
  declarations: [
    ListNewsPageComponent,
  ],
  imports: [
    RouterModule.forRoot([
      { path: 'list-news', component: ListNewsPageComponent, pathMatch: 'full' },
    ], {scrollPositionRestoration: 'enabled'}),
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    ListNewsModule,
    // Blocks
  ],
  exports: [ListNewsPageComponent],
})
export class ListNewsPageModule {
}
