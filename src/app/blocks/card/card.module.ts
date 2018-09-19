import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponent } from './card.component';
import { ResumeViewComponent, VacancyViewComponent, AddViewComponent, MainStatusComponent, DetailedStatusComponent } from './elements-card';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
  ],
  declarations: [
    CardComponent,

    // elements of card
    VacancyViewComponent,
    ResumeViewComponent,
    AddViewComponent,
    MainStatusComponent,
    DetailedStatusComponent,
  ],
  exports: [CardComponent],
})
export class CardModule {
}
