import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule} from '@angular/material';
import {EditorModule} from '@tinymce/tinymce-angular';
import {BirthdayModule} from '../../modals/birthday';
import {ConstructorResumeComponent} from './constructor-resume.component';
import {TextMaskModule} from 'angular2-text-mask';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatButtonModule,
        BirthdayModule,
        EditorModule,
        TextMaskModule
    ],
    declarations: [ConstructorResumeComponent],
    exports: [ConstructorResumeComponent]
})
export class ConstructorResumeModule {
}
