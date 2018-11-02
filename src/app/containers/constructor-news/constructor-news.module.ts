import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ConstructorNewsComponent } from 'containers/constructor-news/constructor-news.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
  ],
  declarations: [ConstructorNewsComponent],
  exports: [ConstructorNewsComponent],
})
export class ConstructorNewsModule {
}
