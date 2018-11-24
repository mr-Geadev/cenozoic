import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { BannerApi } from 'api';
import { ConstructorBannerComponent } from 'containers/constructor-banner/constructor-banner.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
  ],
  declarations: [ConstructorBannerComponent],
  providers: [BannerApi],
  exports: [ConstructorBannerComponent],
})
export class ConstructorBannerModule {
}
