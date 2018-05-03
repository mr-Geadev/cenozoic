import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {ListVacancyComponent} from './list-vacancy.component';
import {ListVacancyService} from './list-vacancy.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [ListVacancyComponent],
    exports: [ListVacancyComponent],
    providers: [ListVacancyService]
})
export class ListVacancyModule {
}