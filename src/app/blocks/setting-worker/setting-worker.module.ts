import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SettingWorkerComponent} from './setting-worker.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [SettingWorkerComponent],
    exports: [SettingWorkerComponent],
})
export class SettingWorkerModule {

}
