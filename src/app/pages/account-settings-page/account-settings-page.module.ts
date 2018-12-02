import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {LogInGuard} from '../../guards';

import {AccountSettingsPageComponent} from './account-settings-page.component';
import {SettingWorkerModule} from '../../containers/setting-worker';
import {SettingEmployerModule} from '../../containers/setting-employer';

@NgModule({
    declarations: [
        AccountSettingsPageComponent,
    ],
    imports: [
        RouterModule.forRoot([
            {
                path: 'setting',
                component: AccountSettingsPageComponent,
                pathMatch: 'full',
                canActivate: [LogInGuard]
            },
        ], {scrollPositionRestoration: 'enabled'}),
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,

        // containers

        SettingWorkerModule,
        SettingEmployerModule
    ],
    exports: [AccountSettingsPageComponent]
})
export class AccountSettingsPageModule {

}
