import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WorkerSettingComponent } from "./worker-setting.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [WorkerSettingComponent],
    exports: [WorkerSettingComponent],
})
export class WorkerSettingModule {

}