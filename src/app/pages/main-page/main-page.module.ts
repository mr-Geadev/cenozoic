import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material";
import { RouterModule } from "@angular/router";
import { MainPageComponent } from "./main-page.component";

@NgModule({
    declarations: [
        MainPageComponent,
    ],
    imports: [
        RouterModule.forRoot([
            { path: '', component: MainPageComponent, pathMatch: 'full' },
        ]),
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        // Blocks
    ],
    exports: [MainPageComponent]
})
export class  MainPageModule {
}
