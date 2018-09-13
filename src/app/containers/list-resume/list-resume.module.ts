import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardResumeComponent } from 'blocks';

import { ResumeService } from 'services';
import { ListResumeComponent } from './list-resume.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    ListResumeComponent,
    CardResumeComponent
  ],
  exports: [ListResumeComponent],
  providers: [ResumeService],
})
export class ListResumeModule {
}