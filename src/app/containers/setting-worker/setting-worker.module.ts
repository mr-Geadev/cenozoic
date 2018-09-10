import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SettingWorkerComponent} from './setting-worker.component';
import {TextMaskModule} from 'angular2-text-mask';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TextMaskModule
    ],
    declarations: [SettingWorkerComponent],
    exports: [SettingWorkerComponent],
})
export class SettingWorkerModule {

}
