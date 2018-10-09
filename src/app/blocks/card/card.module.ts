import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuestionnaireViewComponent } from 'blocks/card/elements-card/questionnaire';
import { AnswerToOfferModule, AnswerToRespondModule } from 'pop-ups';
import { RespondsApi } from 'api';
import { ConfirmService } from "../../services";
import { CardComponent } from './card.component';
import { ResumeViewComponent, VacancyViewComponent, AddViewComponent, MainStatusComponent, DetailedStatusComponent } from './elements-card';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    AnswerToRespondModule,
    AnswerToOfferModule
  ],
  declarations: [
    CardComponent,

    // elements of card
    VacancyViewComponent,
    ResumeViewComponent,
    QuestionnaireViewComponent,
    AddViewComponent,
    MainStatusComponent,
    DetailedStatusComponent,
  ],
  providers: [RespondsApi, ConfirmService],
  exports: [CardComponent],
})
export class CardModule {
}
