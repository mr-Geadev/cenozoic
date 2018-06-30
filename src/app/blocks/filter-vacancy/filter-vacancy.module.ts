import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule} from '@angular/material';
import {FilterVacancyComponent} from './filter-vacancy.component';
import {FilterVacancyService} from './filter-vacancy.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
    ],
    declarations: [FilterVacancyComponent],
    exports: [FilterVacancyComponent],
    providers: [FilterVacancyService]
})
export class FilterVacancyModule {
}
