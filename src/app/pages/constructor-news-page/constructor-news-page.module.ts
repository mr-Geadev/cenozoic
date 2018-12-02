import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConstructorNewsModule } from 'containers/constructor-news';
import { BlankAccountGuard, LogInGuard, NotWorkerGuard } from 'guards';
import { ConstructorNewsPageComponent } from './constructor-news-page.component';

@NgModule({
  declarations: [
    ConstructorNewsPageComponent,
  ],
  imports: [
    RouterModule.forRoot([
      {
        path: 'create-news',
        component: ConstructorNewsPageComponent,
        pathMatch: 'full',
        canActivate: [LogInGuard, NotWorkerGuard, BlankAccountGuard],
      },
    ], {scrollPositionRestoration: 'enabled'}),
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ConstructorNewsModule
  ],
  exports: [ConstructorNewsPageComponent],
})
export class ConstructorNewsPageModule {
}
