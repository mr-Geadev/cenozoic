import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import {BirthdayComponent} from './birthday.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule
    ],
    declarations: [BirthdayComponent],
    exports: [BirthdayComponent]
})
export class BirthdayModule {
}