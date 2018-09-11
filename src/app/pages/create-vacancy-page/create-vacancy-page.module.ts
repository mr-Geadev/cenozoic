import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {LogInGuard, NotWorkerGuard} from '../guards';
import {BlankAccountGuard} from '../guards/blank-account.guard';

import {CreateVacancyPageComponent} from './create-vacancy-page.component';
import {ConstructorVacancyModule} from '../../containers/constructor-vacancy';


@NgModule({
    declarations: [
        CreateVacancyPageComponent,
    ],
    imports: [
        RouterModule.forRoot([
            {
                path: 'create-vacancy',
                component: CreateVacancyPageComponent,
                pathMatch: 'full',
                canActivate: [LogInGuard, NotWorkerGuard, BlankAccountGuard]
            },
        ]),
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        // Blocks
        ConstructorVacancyModule
    ],
    exports: [CreateVacancyPageComponent]
})
export class CreateVacancyPageModule {
}
