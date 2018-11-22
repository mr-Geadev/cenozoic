import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListResumeModule } from 'containers/list-resume';
import { ListVacancyModule } from 'containers/list-vacancy';

import { LastAddedComponent } from './last-added.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ListVacancyModule,
    ListResumeModule,
  ],
  declarations: [LastAddedComponent],
  exports: [LastAddedComponent],
})
export class LastAddedModule {
}