import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConstructorNewsModule } from 'containers/constructor-news';
import { EditNewsPageComponent } from 'pages/edit-news-page/edit-news-page.component';
import { LogInGuard, NotWorkerGuard } from 'guards';
import { BlankAccountGuard } from 'guards';

@NgModule({
  declarations: [
    EditNewsPageComponent,
  ],
  imports: [
    RouterModule.forRoot([
      {
        path: 'edit-news/:id',
        component: EditNewsPageComponent,
        pathMatch: 'full',
        canActivate: [LogInGuard, NotWorkerGuard, BlankAccountGuard],
      },
    ]),
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    // Blocks
    ConstructorNewsModule,
  ],
  exports: [EditNewsPageComponent],
})
export class EditNewsPageModule {
}
