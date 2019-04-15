import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { LogInGuard } from 'guards';

import { LoginModalModule } from '../../pop-ups';
import { VacancyFullPageComponent } from './vacancy-full-page.component';
import { FullVacancyModule } from '../../containers/full-vacancy';

@NgModule({
  declarations: [
    VacancyFullPageComponent,
  ],
  imports: [
    RouterModule.forRoot([
      {
        path: 'vacancy/:id',
        component: VacancyFullPageComponent,
        pathMatch: 'full',
        canActivate: [LogInGuard],
      },
    ], { scrollPositionRestoration: 'enabled' }),
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    LoginModalModule,

    // Blocks
    FullVacancyModule,

  ],
  exports: [VacancyFullPageComponent],
})
export class VacancyFullPageModule {
}
