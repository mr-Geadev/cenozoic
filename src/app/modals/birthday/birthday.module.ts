import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatDatepickerModule, MatFormFieldModule} from '@angular/material';

import {BirthdayComponent} from './birthday.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDatepickerModule
    ],
    declarations: [BirthdayComponent],
    exports: [BirthdayComponent]
})
export class BirthdayModule {
}