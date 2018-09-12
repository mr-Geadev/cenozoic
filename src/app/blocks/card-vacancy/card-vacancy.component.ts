import { Component, Input } from '@angular/core';
import { VacancyModel } from 'models';


@Component({
  selector: 'card-vacancy',
  templateUrl: 'card-vacancy.component.html',
  styleUrls: ['card-vacancy.component.scss']
})
export class CardVacancyComponent {

  @Input('vacancy') vacancy: VacancyModel;
  @Input('dictionary') dictionary: any;

  constructor() {
  }

}
