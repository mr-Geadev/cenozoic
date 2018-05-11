import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material';
import {RouterModule} from '@angular/router';

import {LoginModalModule} from '../../modals';
import {AuthPageComponent} from './auth-page.component';

@NgModule({
    declarations: [
        AuthPageComponent,
    ],
    imports: [
        RouterModule.forRoot([
            {path: 'auth', component: AuthPageComponent, pathMatch: 'full'},
        ]),
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        LoginModalModule
    ],
    exports: [AuthPageComponent]
})
export class AuthPageModule {
}
