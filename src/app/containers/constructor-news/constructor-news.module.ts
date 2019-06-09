import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NewsApi } from 'api';
import { ConstructorNewsComponent } from 'containers/constructor-news/constructor-news.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    EditorModule,
    QuillModule,
    ImageCropperModule
  ],
  declarations: [ConstructorNewsComponent],
  providers: [NewsApi],
  exports: [ConstructorNewsComponent],
})
export class ConstructorNewsModule {
}
