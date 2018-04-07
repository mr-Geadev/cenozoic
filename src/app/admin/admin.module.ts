import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatToolbarModule,
} from "@angular/material";

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from "./admin.component";
import { MainComponent } from "./build-blocks/main/main.component";
import { ResumeListComponent } from './build-blocks/resume-list/resume-list.component';
import { UsersComponent } from "./build-blocks/users/users.component";

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,

        // material
        MatCardModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatTabsModule
    ],
    declarations: [
        // core
        AdminComponent,

        // pages
        ResumeListComponent,
        MainComponent,
        UsersComponent
    ]
})
export class AdminModule {
}
