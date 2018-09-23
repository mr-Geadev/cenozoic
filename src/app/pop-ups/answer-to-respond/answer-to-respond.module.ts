import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material';
import { VacancyApi } from "../../api";
import { AnswerToRespondComponent } from './answer-to-respond.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatSelectModule
    ],
    declarations: [AnswerToRespondComponent],
    entryComponents: [AnswerToRespondComponent],
    providers: [VacancyApi],
    exports: [AnswerToRespondComponent]
})
export class AnswerToRespondModule {
}
