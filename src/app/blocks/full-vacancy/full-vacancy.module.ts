import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FullVacancyComponent} from './full-vacancy.component';
import {FullVacancyService} from './full-vacancy.service';
import {YearsFromPipe} from './yearsFrom.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [
        FullVacancyComponent,
        YearsFromPipe
    ],
    exports: [FullVacancyComponent],
    providers: [FullVacancyService]
})
export class FullVacancyModule {
}