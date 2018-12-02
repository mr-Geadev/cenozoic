import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule, MatFormFieldModule, MatSelectModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {FilterResumesModule} from '../../containers/filter-resumes';
import {ListResumeModule} from '../../containers/list-resume';

import {ListResumePageComponent} from './list-resume-page.component';


@NgModule({
    declarations: [
        ListResumePageComponent,
    ],
    imports: [
        RouterModule.forRoot([
            {path: 'list-resume', component: ListResumePageComponent, pathMatch: 'full'},
        ], {scrollPositionRestoration: 'enabled'}),
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        FilterResumesModule,
        ListResumeModule,
        MatFormFieldModule,
        MatSelectModule
        // Blocks
    ],
    exports: [ListResumePageComponent]
})
export class ListResumePageModule {
}
