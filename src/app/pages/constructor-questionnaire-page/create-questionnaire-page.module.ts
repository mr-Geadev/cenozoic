import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ConstructorQuestionnaireModule } from 'containers/constructor-questionnaire';
import { CreateQuestionnairePageComponent } from 'pages/constructor-questionnaire-page/create-questionnaire-page.component';
import { BlankAccountGuard, LogInGuard, NotWorkerGuard } from 'guards';


@NgModule({
  declarations: [
    CreateQuestionnairePageComponent,
  ],
  imports: [
    RouterModule.forRoot([
      {
        path: 'create-questionnaire',
        component: CreateQuestionnairePageComponent,
        pathMatch: 'full',
        canActivate: [LogInGuard, NotWorkerGuard, BlankAccountGuard]
      },
    ]),
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    // Blocks
    ConstructorQuestionnaireModule
  ],
  exports: [CreateQuestionnairePageComponent]
})
export class CreateQuestionnairePageModule {
}
