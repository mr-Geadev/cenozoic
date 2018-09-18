import { Component, Input, OnInit } from '@angular/core';
import { VacancyModel } from 'models';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  /*
   В карточку приходит тип аккаута и одна из сущностей,
   Основываясь на ней и типе аккаунта мы выводим разные карточки.
   Словарь приходит, чтобы не делать подписку на сервис локализации в каждой карточке
   */
  @Input('typeUser') typeUser: string; // worker/employer
  @Input('dictionary') dictionary: any;
  @Input('vacancy') vacancy?: VacancyModel;
  @Input('resume') resume?: any;
  @Input('respond') respond?: any;
  @Input('addNew') addNew?: boolean;

  public get addRoute(): string {
    if (this.typeUser === 'worker') {
      return '/create-resume';
    } else {
      return '/create-vacancy';
    }
  }

  public get viewRoute(): string {
    if (this.resume) {
      return `/resume/${this.resume._id}`;
    } else if (this.vacancy) {
      return `/vacancy/${this.vacancy._id}`;
    }

    return null;
  }

  constructor() {
  }

  public ngOnInit() {
  }

}
