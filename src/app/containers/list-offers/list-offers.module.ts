import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardOfferComponent, CardRespondComponent } from 'blocks';
import { ListOffersComponent } from 'containers/list-offers/list-offers.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    ListOffersComponent,
    CardOfferComponent,
  ],
  exports: [ListOffersComponent],
})
export class ListOffersModule {
}
