import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardModule } from 'blocks';
import { ListRespondComponent } from './list-respond.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CardModule
  ],
  declarations: [
    ListRespondComponent
  ],
  exports: [ListRespondComponent],
})
export class ListRespondModule {
}
