import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'pipes/pipes.module';
import { PayingModalService } from 'pop-ups/paying';
import { FullVacancyComponent } from './full-vacancy.component';
import { FullVacancyService } from './full-vacancy.service';
import { YearsFromPipe } from './yearsFrom.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PipesModule
  ],
  declarations: [
    FullVacancyComponent,
    YearsFromPipe,
  ],
  exports: [FullVacancyComponent],
  providers: [
    FullVacancyService,
    PayingModalService
  ],
})
export class FullVacancyModule {
}
