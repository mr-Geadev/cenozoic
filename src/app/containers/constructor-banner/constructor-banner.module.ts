import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material';
import { EditorModule } from '@tinymce/tinymce-angular';
import { BannerApi } from 'api';
import { ConstructorBannerComponent } from 'containers/constructor-banner/constructor-banner.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    EditorModule,
    ImageCropperModule,
    QuillModule
  ],
  declarations: [ConstructorBannerComponent],
  providers: [BannerApi],
  exports: [ConstructorBannerComponent],
})
export class ConstructorBannerModule {
}
