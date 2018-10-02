import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { ConstructorVacancyModule } from 'containers/constructor-vacancy';
import {EditVacancyPageComponent } from './edit-vacancy-page.component';
import {LogInGuard, NotWorkerGuard} from '../../guards';
import {BlankAccountGuard} from '../../guards/blank-account.guard';


@NgModule({
  declarations: [
    EditVacancyPageComponent,
  ],
  imports: [
    RouterModule.forRoot([
      {
        path: 'edit-vacancy',
        component: EditVacancyPageComponent,
        pathMatch: 'full',
        canActivate: [LogInGuard, NotWorkerGuard, BlankAccountGuard]
      },
    ]),
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    // Blocks
    ConstructorVacancyModule
  ],
  exports: [EditVacancyPageComponent]
})
export class EditVacancyPageModule {
}
