import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import { QuestionnaireModule } from 'containers/questionnaire';
import { QuestionnairePageComponent } from 'pages/questionnaire-page/questionnaire-page.component';

import {LoginModalModule} from '../../pop-ups';

@NgModule({
  declarations: [
    QuestionnairePageComponent,
  ],
  imports: [
    RouterModule.forRoot([
      {path: 'questionnaire/:id', component: QuestionnairePageComponent},
    ]),
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    LoginModalModule,

    // Blocks
    QuestionnaireModule
  ],
  exports: [QuestionnairePageComponent]
})
export class QuestionnairePageModule {
}
