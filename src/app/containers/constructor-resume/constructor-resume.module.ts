import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule} from '@angular/material';
import {EditorModule} from '@tinymce/tinymce-angular';
import { ImageCropperModule } from 'ngx-image-cropper';
import {BirthdayModule} from '../../pop-ups/birthday';
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
        TextMaskModule,
        ImageCropperModule
    ],
    declarations: [ConstructorResumeComponent],
    exports: [ConstructorResumeComponent]
})
export class ConstructorResumeModule {
}
