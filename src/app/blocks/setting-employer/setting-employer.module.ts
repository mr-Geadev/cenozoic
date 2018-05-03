import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SettingEmployerComponent} from './setting-employer.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [SettingEmployerComponent],
    exports: [SettingEmployerComponent]
})
export class SettingEmployerModule {
}