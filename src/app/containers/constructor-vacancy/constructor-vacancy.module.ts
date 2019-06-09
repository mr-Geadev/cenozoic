import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatProgressSpinnerModule, MatSelectModule } from '@angular/material';
import {EditorModule} from '@tinymce/tinymce-angular';
import { VacancyApi } from 'api';
import { QuillModule } from 'ngx-quill';

import {ConstructorVacancyComponent} from './constructor-vacancy.component';

@NgModule({
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        EditorModule,
        QuillModule,
        MatButtonModule,
        MatProgressSpinnerModule
    ],
    declarations: [ConstructorVacancyComponent],
    exports: [ConstructorVacancyComponent],
    providers: [VacancyApi]
})
export class ConstructorVacancyModule {
}
