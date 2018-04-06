import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatIconModule, MatListModule, MatButtonModule } from "@angular/material";

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from "./admin.component";
import { ResumeListComponent } from './resume-list/resume-list.component';

@NgModule({
  imports: [
      CommonModule,
      AdminRoutingModule,

      // material
      MatCardModule,
      MatListModule,
      MatIconModule,
      MatButtonModule,
  ],
  declarations: [AdminComponent, ResumeListComponent]
})
export class AdminModule { }
