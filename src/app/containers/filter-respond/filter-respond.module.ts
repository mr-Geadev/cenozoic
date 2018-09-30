import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { FilterRespondComponent } from './filter-respond.component';
import { FilterRespondService } from './filter-respond.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
  ],
  declarations: [FilterRespondComponent],
  exports: [FilterRespondComponent],
  providers: [FilterRespondService],
})
export class FilterRespondModule {
}
