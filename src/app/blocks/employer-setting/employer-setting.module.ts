import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EmployerSettingComponent } from "./employer-setting.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [EmployerSettingComponent],
    exports: [EmployerSettingComponent]
})
export class EmployerSettingModule {
}