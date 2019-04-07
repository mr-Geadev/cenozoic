import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NewsApi } from 'api';
import { ConstructorNewsComponent } from 'containers/constructor-news/constructor-news.component';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    ImageCropperModule
  ],
  declarations: [ConstructorNewsComponent],
  providers: [NewsApi],
  exports: [ConstructorNewsComponent],
})
export class ConstructorNewsModule {
}
