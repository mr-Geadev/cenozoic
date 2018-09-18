import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponent } from './card.component';
import { ResumeCardComponent, VacancyCardComponent } from './view-blocks';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
  ],
  declarations: [
    CardComponent,

    VacancyCardComponent,
    ResumeCardComponent,
  ],
  exports: [CardComponent],
})
export class CardModule {
}
