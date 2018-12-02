import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { ConstructorQuestionnaireModule } from 'containers/constructor-questionnaire';
import { EditQuestionnairePageComponent } from 'pages/edit-questionnaire-page/edit-questionnaire-page.component';
import {LogInGuard, NotWorkerGuard} from '../../guards';
import {BlankAccountGuard} from '../../guards/blank-account.guard';


@NgModule({
  declarations: [
    EditQuestionnairePageComponent,
  ],
  imports: [
    RouterModule.forRoot([
      {
        path: 'edit-questionnaire/:id',
        component: EditQuestionnairePageComponent,
        pathMatch: 'full',
        canActivate: [LogInGuard, NotWorkerGuard, BlankAccountGuard]
      },
    ], {scrollPositionRestoration: 'enabled'}),
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    // Blocks
    ConstructorQuestionnaireModule
  ],
  exports: [EditQuestionnairePageComponent]
})
export class EditQuestionnairePageModule {
}
