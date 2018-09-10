import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FullResumeComponent} from './full-resume.component';
import {YearsPipe} from './years.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [
        FullResumeComponent,
        YearsPipe
    ],
    exports: [FullResumeComponent]
})
export class FullResumeModule {
}