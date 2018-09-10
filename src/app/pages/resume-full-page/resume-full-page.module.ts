import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material';
import {RouterModule} from '@angular/router';

import {LoginModalModule} from '../../pop-ups';
import {ResumeFullPageComponent} from './resume-full-page.component';
import {FullResumeModule} from '../../containers/full-resume/full-resume.module';

@NgModule({
    declarations: [
        ResumeFullPageComponent,
    ],
    imports: [
        RouterModule.forRoot([
            {path: 'resume/:id', component: ResumeFullPageComponent, pathMatch: 'full'},
        ]),
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        LoginModalModule,

        // Blocks
        FullResumeModule

    ],
    exports: [ResumeFullPageComponent]
})
export class ResumeFullPageModule {
}
