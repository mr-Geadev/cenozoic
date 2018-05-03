import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {LogInGuard} from '../../guards';

import {AccountSettingPageComponent} from './account-setting-page.component';
import {SettingWorkerModule} from '../../blocks/setting-worker';
import {SettingEmployerModule} from '../../blocks/setting-employer';

@NgModule({
    declarations: [
        AccountSettingPageComponent,
    ],
    imports: [
        RouterModule.forRoot([
            {
                path: 'setting',
                component: AccountSettingPageComponent,
                pathMatch: 'full',
                canActivate: [LogInGuard]
            },
        ]),
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,

        // blocks

        SettingWorkerModule,
        SettingEmployerModule
    ],
    exports: [AccountSettingPageComponent]
})
export class AccountSettingPageModule {

}
