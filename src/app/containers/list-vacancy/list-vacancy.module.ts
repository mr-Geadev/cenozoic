import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { CardVacancyComponent } from 'app/blocks/card-vacancy';

import {ListVacancyComponent} from './list-vacancy.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
      ListVacancyComponent,
      CardVacancyComponent
    ],
    exports: [ListVacancyComponent],
})
export class ListVacancyModule {
}