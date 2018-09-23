import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material';
import { ListResumeApi, RespondsApi } from 'api';
import { AnswerToOfferComponent } from './answer-to-offer.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatSelectModule
    ],
    declarations: [AnswerToOfferComponent],
    entryComponents: [AnswerToOfferComponent],
    providers: [ListResumeApi, RespondsApi],
    exports: [AnswerToOfferComponent]
})
export class AnswerToOfferModule {
}
