import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule} from '@angular/material';

import {FilterResumesComponent} from './filter-resumes.component';
import {FilterResumesService} from './filter-resumes.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
    ],
    declarations: [FilterResumesComponent],
    exports: [FilterResumesComponent],
    providers: [FilterResumesService]
})
export class FilterResumesModule {
}
