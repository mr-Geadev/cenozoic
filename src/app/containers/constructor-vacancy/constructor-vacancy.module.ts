import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatFormFieldModule, MatSelectModule} from '@angular/material';
import {EditorModule} from '@tinymce/tinymce-angular';

import {ConstructorVacancyService} from './constructor-vacancy.service';
import {ConstructorVacancyComponent} from './constructor-vacancy.component';

@NgModule({
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        EditorModule,
        MatButtonModule
    ],
    declarations: [ConstructorVacancyComponent],
    exports: [ConstructorVacancyComponent],
    providers: [ConstructorVacancyService]
})
export class ConstructorVacancyModule {
}
