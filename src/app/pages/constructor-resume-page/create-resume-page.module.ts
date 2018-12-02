import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ConstructorResumeModule } from '../../containers';
import { BlankAccountGuard, LogInGuard, NotEmployerGuard } from '../../guards';

import { CreateResumePageComponent } from './create-resume-page.component';

@NgModule({
    declarations: [
        CreateResumePageComponent,
    ],
    imports: [
        RouterModule.forRoot([
            {
                path: 'create-resume',
                component: CreateResumePageComponent,
                pathMatch: 'full',
                canActivate: [LogInGuard, NotEmployerGuard, BlankAccountGuard]
            },
        ], {scrollPositionRestoration: 'enabled'}),
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        ConstructorResumeModule
        // Blocks
    ],
    exports: [CreateResumePageComponent]
})
export class CreateResumePageModule {
}
