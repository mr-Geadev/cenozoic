import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FullVacancyComponent} from './full-vacancy.component';
import {FullVacancyService} from './full-vacancy.service';

@NgModule({
    imports: [CommonModule],
    declarations: [FullVacancyComponent],
    exports: [FullVacancyComponent],
    providers: [FullVacancyService]
})
export class FullVacancyModule {
}