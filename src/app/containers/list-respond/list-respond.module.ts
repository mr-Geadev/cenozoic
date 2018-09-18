import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardRespondComponent } from 'blocks';
import { ListRespondComponent } from './list-respond.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    ListRespondComponent,
    CardRespondComponent,
  ],
  exports: [ListRespondComponent],
})
export class ListRespondModule {
}
