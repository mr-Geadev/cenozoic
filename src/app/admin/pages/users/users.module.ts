import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatCard, MatTabsModule } from "@angular/material";
import { UsersComponent } from "./users.component";

@NgModule({
    declarations: [
        UsersComponent,
    ],
    imports: [
        CommonModule,
        MatTabsModule,
        MatCard,
    ],
    exports: [UsersComponent]
})
export class UsersModule {
}
