import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from 'blocks/card';

import { ResumeService } from 'services';
import { ListResumeComponent } from './list-resume.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CardModule
  ],
  declarations: [
    ListResumeComponent
  ],
  exports: [ListResumeComponent],
  providers: [ResumeService],
})
export class ListResumeModule {
}