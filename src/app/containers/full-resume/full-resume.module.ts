import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from 'pipes/pipes.module';
import { PayingModalService } from 'pop-ups/paying';
import { FullResumeComponent } from './full-resume.component';
import { YearsPipe } from './years.pipe';

@NgModule({
  imports: [
    CommonModule,
    PipesModule
  ],
  declarations: [
    FullResumeComponent,
    YearsPipe,
  ],
  exports: [FullResumeComponent],
  providers: [PayingModalService],
})
export class FullResumeModule {
}
